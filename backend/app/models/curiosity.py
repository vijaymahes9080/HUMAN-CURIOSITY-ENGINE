from sqlalchemy import Column, String, Integer, Float, Text, Boolean, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid
from backend.app.database.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, default="Curiosity Explorer")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class AnalysisSession(Base):
    __tablename__ = "analysis_sessions"
    id = Column(String, primary_key=True, default=generate_uuid)
    topic = Column(String, index=True, nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    provider_used = Column(String, default="mock")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    raw_response = Column(JSON, nullable=True)

class Question(Base):
    __tablename__ = "questions"
    id = Column(String, primary_key=True, default=generate_uuid)
    session_id = Column(String, ForeignKey("analysis_sessions.id"), nullable=True)
    title = Column(Text, nullable=False)
    topic = Column(String, index=True, nullable=False)
    category = Column(String, index=True, nullable=False)
    curiosity_score = Column(Integer, default=90)
    dna_data = Column(JSON, nullable=True)
    why_it_matters = Column(Text, nullable=True)
    hidden_blindspot = Column(Text, nullable=True)
    upvotes = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
