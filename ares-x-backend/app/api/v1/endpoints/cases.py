from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.domain import Case, CaseStatus
from app.schemas.domain import CaseCreate, CaseRead
import uuid

router = APIRouter()

@router.get("/", response_model=List[CaseRead])
async def list_cases(db: Session = Depends(get_db)):
    return db.query(Case).all()

@router.post("/", response_model=CaseRead)
async def create_case(
    case_in: CaseCreate,
    db: Session = Depends(get_db)
):
    case_number = f"AR-{uuid.uuid4().hex[:8].upper()}"
    new_case = Case(
        id=str(uuid.uuid4()),
        case_number=case_number,
        title=case_in.title,
        description=case_in.description,
        priority=case_in.priority,
        status=CaseStatus.OPEN
    )
    db.add(new_case)
    db.commit()
    db.refresh(new_case)
    return new_case

@router.get("/{case_id}", response_model=CaseRead)
async def get_case(case_id: str, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case
