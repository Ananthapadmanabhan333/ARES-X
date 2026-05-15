from celery import Celery
import os
import time
import hashlib
from app.core.config import settings
from app.db.session import SessionLocal
from app.models.domain import Evidence, EvidenceType
import cv2
import numpy as np
from PIL import Image, ImageChops

celery_app = Celery(
    "forensic_worker",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND
)

@celery_app.task(name="tasks.process_evidence")
def process_evidence(evidence_id: str):
    """
    Orchestrate forensic analysis for a piece of evidence.
    """
    print(f"[*] Starting forensic analysis for evidence: {evidence_id}")
    db = SessionLocal()
    try:
        evidence = db.query(Evidence).filter(Evidence.id == evidence_id).first()
        if not evidence:
            print(f"[!] Evidence {evidence_id} not found in database.")
            return
        
        # 1. Calculate Hash (if pending)
        if evidence.sha256_hash == "PENDING_CALCULATION":
            sha256_hash = hashlib.sha256()
            with open(evidence.file_path, "rb") as f:
                for byte_block in iter(lambda: f.read(4096), b""):
                    sha256_hash.update(byte_block)
            evidence.sha256_hash = sha256_hash.hexdigest()
            db.commit()

        # 2. Extract Metadata & Perform Media Forensics
        # (Mocking heavy analysis for demo)
        time.sleep(3)
        
        findings = {
            "metadata": {"format": evidence.mime_type, "size": evidence.size_bytes},
            "integrity": "verified",
            "forensic_score": 0.92,
            "anomalies": [
                {"type": "JPEG_QUANTIZATION", "confidence": 0.88, "location": [120, 450]}
            ]
        }
        
        evidence.forensic_analysis = findings
        db.commit()
        print(f"[+] Forensic analysis complete for {evidence_id}")
        
    except Exception as e:
        print(f"[!] Error processing evidence {evidence_id}: {str(e)}")
        db.rollback()
    finally:
        db.close()

    return {"status": "SUCCESS", "evidence_id": evidence_id}
