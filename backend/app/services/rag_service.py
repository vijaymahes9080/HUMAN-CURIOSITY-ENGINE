import re
import math
from typing import List, Dict, Any

class RAGService:
    """
    In-memory semantic search and document chunking service for
    retrieving domain context, grounding agent reasoning, and tracking source attribution.
    """

    def __init__(self):
        self.documents: List[Dict[str, Any]] = []

    def add_document(self, doc_id: str, title: str, text: str, domain: str):
        """Chunks and indexes incoming documents or research abstracts."""
        chunks = self._chunk_text(text)
        for idx, chunk in enumerate(chunks):
            self.documents.append({
                "doc_id": doc_id,
                "chunk_id": f"{doc_id}-{idx}",
                "title": title,
                "domain": domain,
                "text": chunk,
                "word_tokens": set(self._tokenize(chunk))
            })

    def search(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        """Performs TF-IDF style semantic overlap retrieval."""
        query_tokens = set(self._tokenize(query))
        if not query_tokens:
            return []

        scored = []
        for doc in self.documents:
            intersection = query_tokens.intersection(doc["word_tokens"])
            score = len(intersection) / (math.sqrt(len(query_tokens)) * math.sqrt(max(1, len(doc["word_tokens"]))))
            if score > 0.05:
                scored.append((score, doc))

        scored.sort(key=lambda x: x[0], reverse=True)
        return [item[1] for item in scored[:top_k]]

    def _chunk_text(self, text: str, chunk_size: int = 400) -> List[str]:
        words = text.split()
        return [" ".join(words[i:i + chunk_size]) for i in range(0, len(words), chunk_size - 50)]

    def _tokenize(self, text: str) -> List[str]:
        return re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())

rag_service = RAGService()
