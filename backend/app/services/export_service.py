import json
from typing import Dict, Any, List

class CuriosityExportService:
    """
    Generates standardized academic and executive exports (Markdown, JSON, BibTeX).
    """

    @classmethod
    def to_markdown(cls, topic: str, questions: List[Dict[str, Any]]) -> str:
        lines = [
            f"# 🧠 Human Curiosity Engine Discovery Report: {topic}",
            "",
            "> Discovered questions humanity forgot to ask.",
            "",
            "---",
            ""
        ]
        for i, q in enumerate(questions, 1):
            lines.append(f"## {i}. {q.get('title')}")
            lines.append(f"- **Curiosity Score:** {q.get('curiosity_score')}/100")
            lines.append(f"- **Category:** {q.get('category')}")
            lines.append(f"- **Hidden Blindspot:** {q.get('hidden_blindspot')}")
            lines.append(f"- **Why It Matters:** {q.get('why_it_matters')}")
            lines.append("")
        return "\n".join(lines)

    @classmethod
    def to_bibtex(cls, topic: str) -> str:
        key = topic.lower().replace(" ", "_")[:20]
        return f"""@misc{{{key}_curiosity_2026,
  author = {{Mahes, Vijay}},
  title = {{Curiosity Discovery Report on {topic}}},
  year = {{2026}},
  publisher = {{Human Curiosity Engine}},
  url = {{https://github.com/vijaymahes9080/HUMAN-CURIOSITY-ENGINE}}
}}"""
