from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "HUMAN CURIOSITY ENGINE"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = "curiosity-engine-super-secret-key-2026-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./curiosity_engine.db"
    
    # AI Providers
    GEMINI_API_KEY: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    DEFAULT_PROVIDER: str = "mock"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
