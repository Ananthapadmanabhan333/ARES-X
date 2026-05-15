from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from app.core.config import settings

router = APIRouter()

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Mock authentication
    if form_data.username == "admin" and form_data.password == "ares_x_secure":
        return {
            "access_token": "mock_token_for_ares_x",
            "token_type": "bearer",
            "user": {
                "id": "u-1",
                "username": "admin",
                "role": "principal_investigator"
            }
        }
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )

@router.get("/me")
async def get_current_user():
    return {
        "id": "u-1",
        "username": "admin",
        "role": "principal_investigator",
        "organization": "ARES Intelligence Unit"
    }
