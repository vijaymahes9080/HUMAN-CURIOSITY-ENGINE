import unittest
import asyncio
from backend.app.agents.orchestrator import CuriosityOrchestrator
from backend.app.agents.research_agent import ResearchIntelligenceAgent
from backend.app.agents.assumption_agent import AssumptionDetectionAgent
from backend.app.agents.blindspot_agent import HumanBlindspotAgent

class TestCuriosityAgents(unittest.TestCase):

    def test_research_agent(self):
        agent = ResearchIntelligenceAgent()
        res = asyncio.run(agent.analyze("Quantum Computing"))
        self.assertEqual(res["agent_id"], "research_intel")
        self.assertGreater(len(res["knowledge_gaps"]), 0)

    def test_assumption_agent(self):
        agent = AssumptionDetectionAgent()
        res = asyncio.run(agent.detect("Cellular Longevity"))
        self.assertIn("cultural_assumptions", res)
        self.assertGreater(len(res["technical_assumptions"]), 0)

    def test_blindspot_agent(self):
        agent = HumanBlindspotAgent()
        res = asyncio.run(agent.discover("Artificial Intelligence"))
        self.assertIn("unmeasured_factors", res)
        self.assertGreater(len(res["ignored_stakeholders"]), 0)

    def test_orchestrator_pipeline(self):
        orchestrator = CuriosityOrchestrator()
        report = asyncio.run(orchestrator.execute_pipeline("Autonomous Systems"))
        self.assertIn("questions", report)
        self.assertGreaterEqual(len(report["questions"]), 2)
        self.assertIn("graphNodes", report)
        self.assertIn("futureHorizons", report)

if __name__ == '__main__':
    unittest.main()
