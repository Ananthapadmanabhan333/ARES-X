from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.domain import Evidence, Case, EvidenceType
from app.tasks.forensics import process_evidence
import uuid
import os

router = APIRouter()

@router.post("/upload/{case_id}")
async def upload_evidence(
    case_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # 1. Verify case exists
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    # 2. Save file (mock storage path)
    upload_dir = f"storage/evidence/{case_id}"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
        
    # 3. Create Database Record (Hash will be updated by worker)
    new_evidence = Evidence(
        id=str(uuid.uuid4()),
        case_id=case_id,
        filename=file.filename,
        file_path=file_path,
        file_type=EvidenceType.IMAGE if file.content_type.startswith("image/") else (EvidenceType.VIDEO if file.content_type.startswith("video/") else EvidenceType.OTHER),
        mime_type=file.content_type,
        size_bytes=len(content),
        sha256_hash="PENDING_CALCULATION"
    )
    
    db.add(new_evidence)
    db.commit()
    db.refresh(new_evidence)
    
    # 4. Trigger Asynchronous Forensic Pipeline (Including Hashing)
    process_evidence.delay(new_evidence.id)
    
    return {
        "status": "INGESTED",
        "evidence_id": new_evidence.id,
        "pipeline": "TRIGGERED"
    }

@router.get("/{evidence_id}")
async def get_evidence_details(evidence_id: str, db: Session = Depends(get_db)):
    evidence = db.query(Evidence).filter(Evidence.id == evidence_id).first()
    if not evidence:
        raise HTTPException(status_code=404, detail="Evidence not found")
    return evidence
