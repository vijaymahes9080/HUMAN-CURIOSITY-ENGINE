from typing import Dict, Any, List
from backend.app.services.dna_engine import QuestionDNAEngine

class QuestionRankingAgent:
    """
    Agent 8: Question Ranking Agent.
    Scores each generated question across the 8 DNA dimensions and computes the composite Curiosity Score (0-100).
    """

    async def rank_and_score(self, questions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        ranked = []
        for q in questions:
            dna = q.get("dna", {})
            score = QuestionDNAEngine.compute_curiosity_score(dna)
            q["curiosity_score"] = score
            if "dna" in q:
                q["dna"]["curiosity_score"] = score
            ranked.append(q)

        ranked.sort(key=lambda x: x.get("curiosity_score", 0), reverse=True)
        return ranked
