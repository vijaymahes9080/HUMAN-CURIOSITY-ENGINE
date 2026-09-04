from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from backend.app.core.security import create_access_token, get_password_hash, verify_password

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str = "Curiosity Explorer"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

@router.post("/register", response_model=TokenResponse)
async def register(user_in: UserRegister):
    token = create_access_token(subject=user_in.email)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "email": user_in.email,
            "full_name": user_in.full_name
        }
    }

@router.post("/login", response_model=TokenResponse)
async def login(user_in: UserLogin):
    token = create_access_token(subject=user_in.email)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "email": user_in.email,
            "full_name": "Vijay Mahes"
        }
    }
