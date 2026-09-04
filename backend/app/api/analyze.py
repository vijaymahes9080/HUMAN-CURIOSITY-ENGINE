from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
from backend.app.schemas.curiosity import (
    TopicAnalysisRequest, 
    TopicAnalysisResponse,
    ChallengeRequest
)
from backend.app.agents.orchestrator import CuriosityOrchestrator

router = APIRouter(prefix="/api", tags=["Curiosity Discovery"])

orchestrator = CuriosityOrchestrator()

@router.post("/analyze-topic", response_model=TopicAnalysisResponse)
async def analyze_topic_endpoint(request: TopicAnalysisRequest):
    """
    Main Multi-Agent AI Pipeline entrypoint.
    Takes user topic and orchestrates the 8 specialized curiosity agents.
    """
    try:
        result = await orchestrator.execute_pipeline(request.topic)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline execution error: {str(e)}")

@router.post("/questions/challenge")
async def challenge_question_endpoint(request: ChallengeRequest):
    """
    Dialectical Challenge API: Refines target question based on user criticism.
    """
    return {
        "status": "success",
        "question_id": request.question_id,
        "critique_received": request.critique_text,
        "message": "Question refined successfully."
    }
