from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.api.analyze import router as analyze_router

app = FastAPI(
    title="HUMAN CURIOSITY ENGINE",
    description="AI that discovers the questions humanity forgot to ask.",
    version="2.4.0"
)

# Configure CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(analyze_router)

@app.get("/")
async def root():
    return {
        "engine": "HUMAN CURIOSITY ENGINE",
        "tagline": "AI that discovers the questions humanity forgot to ask.",
        "tamil": "மனிதர்கள் கேட்க மறந்த கேள்விகளை AI கண்டுபிடிக்கும்.",
        "status": "operational",
        "version": "2.4.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "human-curiosity-engine-backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
