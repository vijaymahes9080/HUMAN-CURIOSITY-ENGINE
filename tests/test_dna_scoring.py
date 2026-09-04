import unittest
from backend.app.services.dna_engine import QuestionDNAEngine

class TestQuestionDNAEngine(unittest.TestCase):

    def test_compute_curiosity_score_standard(self):
        dna = {
            'originality': 80,
            'importance': 85,
            'future_impact': 80,
            'research_potential': 75,
            'innovation_potential': 70,
            'urgency': 80,
            'feasibility': 70,
            'human_impact': 85,
        }
        score = QuestionDNAEngine.compute_curiosity_score(dna)
        self.assertGreaterEqual(score, 70)
        self.assertLessEqual(score, 99)

    def test_high_novelty_boost(self):
        dna = {
            'originality': 95,
            'importance': 98,
            'future_impact': 99,
            'research_potential': 94,
            'innovation_potential': 96,
            'urgency': 92,
            'feasibility': 88,
            'human_impact': 98,
        }
        score = QuestionDNAEngine.compute_curiosity_score(dna)
        self.assertGreaterEqual(score, 95)

    def test_cosine_similarity(self):
        v1 = [90, 85, 95, 80, 85, 75, 70, 90]
        v2 = [90, 85, 95, 80, 85, 75, 70, 90]
        sim = QuestionDNAEngine.compute_similarity(v1, v2)
        self.assertAlmostEqual(sim, 1.0, places=4)

if __name__ == '__main__':
    unittest.main()
