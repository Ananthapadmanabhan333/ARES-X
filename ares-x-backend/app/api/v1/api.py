from fastapi import APIRouter
from app.api.v1.endpoints import cases, evidence, intelligence, auth

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(cases.router, prefix="/cases", tags=["Case Management"])
api_router.include_router(evidence.router, prefix="/evidence", tags=["Evidence Intelligence"])
api_router.include_router(intelligence.router, prefix="/intelligence", tags=["Forensic AI"])
