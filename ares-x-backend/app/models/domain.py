from sqlalchemy import Column, String, DateTime, Enum, ForeignKey, JSON, Integer
from sqlalchemy.orm import relationship
from app.db.session import Base
import datetime
import enum
import uuid

class CasePriority(enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class CaseStatus(enum.Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    UNDER_REVIEW = "under_review"
    CLOSED = "closed"
    ARCHIVED = "archived"

class Case(Base):
    __tablename__ = "cases"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    case_number = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    status = Column(Enum(CaseStatus), default=CaseStatus.OPEN)
    priority = Column(Enum(CasePriority), default=CasePriority.MEDIUM)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    assigned_to = Column(String, nullable=True) # User ID reference
    
    evidence = relationship("Evidence", back_populates="case", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="case")

class EvidenceType(enum.Enum):
    IMAGE = "image"
    VIDEO = "video"
    AUDIO = "audio"
    DOCUMENT = "document"
    MEMORY_DUMP = "memory_dump"
    NETWORK_PCAP = "network_pcap"
    LOG_FILE = "log_file"
    OTHER = "other"

class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    case_id = Column(String, ForeignKey("cases.id"), nullable=False)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    file_type = Column(Enum(EvidenceType), nullable=False)
    mime_type = Column(String, nullable=False)
    size_bytes = Column(Integer, nullable=False)
    
    sha256_hash = Column(String, index=True, nullable=False)
    md5_hash = Column(String, nullable=True)
    
    metadata_json = Column(JSON, default={})
    forensic_analysis = Column(JSON, default={}) # AI analysis results
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    case = relationship("Case", back_populates="evidence")
    chain_of_custody = relationship("ChainOfCustody", back_populates="evidence")

class ChainOfCustody(Base):
    __tablename__ = "chain_of_custody"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    evidence_id = Column(String, ForeignKey("evidence.id"), nullable=False)
    action = Column(String, nullable=False) # UPLOADED, ACCESSED, ANALYZED, MOVED, EXPORTED
    performer_id = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    location = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    integrity_hash = Column(String, nullable=False) # Hash of previous entry + current entry
    
    evidence = relationship("Evidence", back_populates="chain_of_custody")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    case_id = Column(String, ForeignKey("cases.id"), nullable=True)
    user_id = Column(String, nullable=False)
    action = Column(String, nullable=False)
    resource_type = Column(String, nullable=False)
    resource_id = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    details = Column(JSON, default={})

    case = relationship("Case", back_populates="audit_logs")
