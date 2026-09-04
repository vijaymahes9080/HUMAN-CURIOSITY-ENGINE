export type NavigationTab = 
  | 'landing' 
  | 'discovery' 
  | 'results' 
  | 'explorer' 
  | 'blindspot_map' 
  | 'future_explorer' 
  | 'research_mode' 
  | 'startup_mode' 
  | 'community' 
  | 'dashboard';

export type QuestionCategory = 
  | 'system_blindspot' 
  | 'unexamined_assumption' 
  | 'future_paradox' 
  | 'reverse_paradigm' 
  | 'missing_stakeholder' 
  | 'ethical_vacuum' 
  | 'unseen_dependency' 
  | 'emerging_frontier';

export interface QuestionDNA {
  originality: number;         // 0-100
  importance: number;          // 0-100
  future_impact: number;       // 0-100
  research_potential: number;  // 0-100
  innovation_potential: number;// 0-100
  urgency: number;             // 0-100
  feasibility: number;         // 0-100
  human_impact: number;        // 0-100
  curiosity_score: number;     // 0-100
  reasoning_pattern: string;   // e.g. "Inversion Analysis", "Systemic Leakage", "Invisible Externality"
  blindspot_source: string;    // e.g. "Cognitive Bias #14: Survivorship of Industrial Logic"
}

export interface DiscoveryPathStep {
  stage: string;
  concept: string;
  description: string;
}

export interface StartupOpportunity {
  title: string;
  problem: string;
  opportunity: string;
  solution: string;
  target_users: string[];
  technology: string[];
  market_size: string;
  business_model: string;
  mvp_idea: string;
  pitch_hook: string;
}

export interface ResearchOpportunity {
  problem_statement: string;
  paper_title: string;
  abstract_concept: string;
  methodology: string;
  potential_breakthrough: string;
}

export interface QuestionChallenge {
  id: string;
  challenge_type: 'importance' | 'already_discussed' | 'flawed_assumption' | 'contradictory_evidence' | 'custom';
  critique_text: string;
  created_at: string;
  ai_revised_question?: string;
  ai_reasoning_update?: string;
}

export interface UnaskedQuestion {
  id: string;
  topic: string;
  title: string;
  category: QuestionCategory;
  curiosity_score: number;
  dna: QuestionDNA;
  why_it_matters: string;
  common_assumptions: string[];
  hidden_blindspot: string;
  future_impact: {
    year_2030: string;
    year_2035: string;
    year_2040: string;
    year_2050: string;
  };
  research_opportunities: ResearchOpportunity;
  startup_opportunity: StartupOpportunity;
  discovery_path: DiscoveryPathStep[];
  related_questions: string[];
  challenges: QuestionChallenge[];
  upvotes: number;
  is_saved: boolean;
  user_voted?: boolean;
  created_at: string;
  tags: string[];
}

export type AgentStatus = 'idle' | 'running' | 'completed' | 'error';

export interface AgentProgressStep {
  agent_id: string;
  name: string;
  icon: string;
  status: AgentStatus;
  progress: number; // 0-100
  thought: string;
  findings_preview?: string[];
  duration_ms?: number;
}

export interface BlindspotNode {
  id: string;
  label: string;
  type: 'topic' | 'assumption' | 'blindspot' | 'contradiction' | 'question';
  category?: string;
  score?: number;
  description?: string;
  x?: number;
  y?: number;
}

export interface BlindspotLink {
  source: string;
  target: string;
  label?: string;
}

export interface FutureHorizonAnalysis {
  year: 2030 | 2035 | 2040 | 2050;
  headline: string;
  scenario_overview: string;
  trend_acceleration: string;
  primary_blindspot: string;
  critical_unasked_questions: {
    question: string;
    urgency: number;
    consequence_if_ignored: string;
  }[];
}

export interface ResearchDomainReport {
  domain: string;
  already_researched: string[];
  emerging_areas: string[];
  research_blindspots: {
    headline: string;
    description: string;
    paper_concept: string;
    suggested_methodology: string;
  }[];
}

export interface CuriosityProfileStats {
  questions_discovered: number;
  blindspots_found: number;
  research_ideas_generated: number;
  startup_opportunities_mapped: number;
  top_categories: { name: string; count: number }[];
  curiosity_score_avg: number;
  streak_days: number;
}

export interface AIProviderConfig {
  provider: 'mock' | 'gemini' | 'openai' | 'ollama';
  apiKey?: string;
  model?: string;
  temperature?: number;
  ollamaUrl?: string;
}
