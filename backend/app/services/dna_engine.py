import math
from typing import Dict, Any, List

class QuestionDNAEngine:
    """
    Mathematical engine for computing 8-dimensional Question DNA vectors,
    harmonic mean compound Curiosity Scores, and semantic novelty filtering.
    """

    WEIGHTS = {
        'originality': 0.20,
        'importance': 0.20,
        'future_impact': 0.15,
        'research_potential': 0.15,
        'innovation_potential': 0.10,
        'urgency': 0.08,
        'feasibility': 0.05,
        'human_impact': 0.07,
    }

    @classmethod
    def compute_curiosity_score(cls, dna_dict: Dict[str, float]) -> int:
        """
        Calculates weighted harmonic-geometric composite score bounded between 0 and 100.
        Penalizes questions that are trivial or lack importance.
        """
        weighted_sum = 0.0
        for dimension, weight in cls.WEIGHTS.items():
            val = max(1.0, float(dna_dict.get(dimension, 50)))
            weighted_sum += weight * val

        # Nonlinear booster for ultra-high originality & future impact
        orig = dna_dict.get('originality', 50)
        fut = dna_dict.get('future_impact', 50)
        boost = 0.0
        if orig >= 90 and fut >= 90:
            boost = 2.5

        final_score = min(99, int(round(weighted_sum + boost)))
        return max(10, final_score)

    @classmethod
    def compute_similarity(cls, vec1: List[float], vec2: List[float]) -> float:
        """Computes cosine similarity between two 8-dimensional DNA vectors."""
        if len(vec1) != len(vec2) or not vec1:
            return 0.0
        dot = sum(a * b for a, b in zip(vec1, vec2))
        norm_a = math.sqrt(sum(a * a for a in vec1))
        norm_b = math.sqrt(sum(b * b for b in vec2))
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot / (norm_a * norm_b)
