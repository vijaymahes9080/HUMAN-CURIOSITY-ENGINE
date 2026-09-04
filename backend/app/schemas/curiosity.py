from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class QuestionDNABase(BaseModel):
    originality: int = Field(default=95, ge=0, le=100)
    importance: int = Field(default=98, ge=0, le=100)
    future_impact: int = Field(default=99, ge=0, le=100)
    research_potential: int = Field(default=94, ge=0, le=100)
    innovation_potential: int = Field(default=96, ge=0, le=100)
    urgency: int = Field(default=92, ge=0, le=100)
    feasibility: int = Field(default=88, ge=0, le=100)
    human_impact: int = Field(default=98, ge=0, le=100)
    curiosity_score: int = Field(default=97, ge=0, le=100)
    reasoning_pattern: str
    blindspot_source: str

class DiscoveryPathStepSchema(BaseModel):
    stage: str
    concept: str
    description: str

class ResearchOpportunitySchema(BaseModel):
    problem_statement: str
    paper_title: str
    abstract_concept: str
    methodology: str
    potential_breakthrough: str

class StartupOpportunitySchema(BaseModel):
    title: str
    problem: str
    opportunity: str
    solution: str
    target_users: List[str]
    technology: List[str]
    market_size: str
    business_model: str
    mvp_idea: str
    pitch_hook: str

class QuestionChallengeSchema(BaseModel):
    id: str
    challenge_type: str
    critique_text: str
    created_at: str
    ai_revised_question: Optional[str] = None
    ai_reasoning_update: Optional[str] = None

class UnaskedQuestionSchema(BaseModel):
    id: str
    topic: str
    title: str
    category: str
    curiosity_score: int
    dna: QuestionDNABase
    why_it_matters: str
    common_assumptions: List[str]
    hidden_blindspot: str
    future_impact: Dict[str, str]
    research_opportunities: ResearchOpportunitySchema
    startup_opportunity: StartupOpportunitySchema
    discovery_path: List[DiscoveryPathStepSchema]
    related_questions: List[str]
    challenges: List[QuestionChallengeSchema] = []
    upvotes: int = 0
    is_saved: bool = False
    created_at: str
    tags: List[str] = []

class BlindspotNodeSchema(BaseModel):
    id: str
    label: str
    type: str
    score: Optional[int] = None
    description: Optional[str] = None

class BlindspotLinkSchema(BaseModel):
    source: str
    target: str
    label: Optional[str] = None

class FutureHorizonAnalysisSchema(BaseModel):
    year: int
    headline: str
    scenario_overview: str
    trend_acceleration: str
    primary_blindspot: str
    critical_unasked_questions: List[Dict[str, Any]]

class ResearchDomainReportSchema(BaseModel):
    domain: str
    already_researched: List[str]
    emerging_areas: List[str]
    research_blindspots: List[Dict[str, str]]

class TopicAnalysisRequest(BaseModel):
    topic: str
    provider_config: Optional[Dict[str, Any]] = None

class TopicAnalysisResponse(BaseModel):
    questions: List[UnaskedQuestionSchema]
    graphNodes: List[BlindspotNodeSchema]
    graphLinks: List[BlindspotLinkSchema]
    futureHorizons: List[FutureHorizonAnalysisSchema]
    researchReport: ResearchDomainReportSchema

class ChallengeRequest(BaseModel):
    question_id: str
    challenge_type: str
    critique_text: str
