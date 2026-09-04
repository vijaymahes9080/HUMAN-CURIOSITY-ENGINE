from typing import Dict, Any, List

class QuestionGenerationAgent:
    """
    Agent 7: Question Generation Agent.
    Synthesizes candidates across the 8-category taxonomy:
    1. System Blindspot
    2. Unexamined Assumption
    3. Future Paradox
    4. Reverse Paradigm
    5. Missing Stakeholder
    6. Ethical Vacuum
    7. Unseen Dependency
    8. Emerging Frontier
    """

    TAXONOMY = [
        "system_blindspot",
        "unexamined_assumption",
        "future_paradox",
        "reverse_paradigm",
        "missing_stakeholder",
        "ethical_vacuum",
        "unseen_dependency",
        "emerging_frontier"
    ]

    async def generate(self, topic: str, blindspots: List[str]) -> List[Dict[str, Any]]:
        return [
            {
                "category": "system_blindspot",
                "template": f"What invisible systemic liabilities are being created by the rapid acceleration of {topic}?"
            },
            {
                "category": "ethical_vacuum",
                "template": f"Who is held liable when independent automated systems in {topic} interact to cause catastrophic contagion?"
            },
            {
                "category": "reverse_paradigm",
                "template": f"What if the primary constraint in {topic} is not technological capacity, but human wisdom and alignment?"
            },
            {
                "category": "missing_stakeholder",
                "template": f"Who are the unrepresented future generations bearing 100% of the long-term cost of decisions in {topic}?"
            }
        ]
