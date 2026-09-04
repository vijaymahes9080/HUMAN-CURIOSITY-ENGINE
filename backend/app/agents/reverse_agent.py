from typing import Dict, Any, List

class ReverseThinkingAgent:
    """
    Agent 6: Reverse Thinking Agent.
    Applies non-linear inversion methods:
    1. Invert the Goal: What if the opposite is true?
    2. System Removal: What happens if this system ceases to exist?
    3. Optimization Trap: What are we optimizing for that actively harms the organism?
    """

    async def invert(self, topic: str) -> List[Dict[str, str]]:
        clean = topic.strip()
        return [
            {
                "pattern": "Inversion of Scarcity",
                "inversion": f"What if the bottleneck in {clean} is not a deficit of answers, but a severe deficit of wise, discernment-grounded questions?",
                "mechanism": "Shifting attention from throughput scaling to wisdom scaling."
            },
            {
                "pattern": "Total System Removal",
                "inversion": f"If {clean} was completely removed tomorrow, what latent human capabilities would immediately awaken?",
                "mechanism": "Diagnosing dependencies masked by convenience."
            },
            {
                "pattern": "Misaligned Optimization Inversion",
                "inversion": f"Who captures 100% of the upside of {clean} while transferring 100% of the systemic tail-risk onto the public commons?",
                "mechanism": "Exposing asymmetric moral hazard."
            }
        ]
