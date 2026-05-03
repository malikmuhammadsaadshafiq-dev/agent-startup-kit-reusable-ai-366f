"""
Agent Startup Kit — FastAPI entry point (Vercel serverless).
All requests route through this file; vercel.json is handled by the Deployer.
"""
import sys
import os

# Ensure api/ directory is on sys.path for sibling imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal, Base
from seed import seed_workflows
from routes.workflows import router as wf_router
from routes.telemetry import router as tel_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create tables + seed data on startup."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_workflows(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title="Agent Startup Kit API",
    description="Reusable AI coding workflow registry — browse, install, and submit workflows.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(wf_router, prefix="/api/workflows", tags=["workflows"])
app.include_router(tel_router, prefix="/api", tags=["telemetry", "stats"])


@app.get("/api/health", tags=["health"])
def health():
    return {"status": "ok", "service": "agent-startup-kit"}
