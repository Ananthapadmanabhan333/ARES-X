from pydantic import BaseModel
from typing import Optional, List, Any
from app.models.domain import CaseStatus, CasePriority, EvidenceType

class CaseBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: CasePriority = CasePriority.MEDIUM

class CaseCreate(CaseBase):
    pass

class CaseRead(CaseBase):
    id: str
    case_number: str
    status: CaseStatus
    
    class Config:
        from_attributes = True

class EvidenceRead(BaseModel):
    id: str
    filename: str
    file_type: EvidenceType
    sha256_hash: str
    forensic_analysis: dict
    
    class Config:
        from_attributes = True

class AnalysisResult(BaseModel):
    evidence_id: str
    status: str
    agent_history: List[str]
    final_hypothesis: str
