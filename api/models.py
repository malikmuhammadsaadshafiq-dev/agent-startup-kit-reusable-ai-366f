import json
from datetime import datetime
from typing import Any, List, Optional
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from pydantic import BaseModel
from database import Base


class WorkflowRow(Base):
    __tablename__ = "workflows"
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, default="")
    tags = Column(Text, default="[]")       # JSON string
    stack = Column(String, default="")
    files = Column(Text, default="[]")      # JSON string
    prompts = Column(Text, default="[]")    # JSON string
    readme = Column(Text, default="")
    status = Column(String, default="PUBLISHED")
    author = Column(String, default="community")
    created_at = Column(DateTime, default=datetime.utcnow)
    install_count = Column(Integer, default=0)


class InstallRow(Base):
    __tablename__ = "installs"
    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=True)
    slug = Column(String, index=True)
    source = Column(String, default="cli")
    created_at = Column(DateTime, default=datetime.utcnow)


def jparse(val: Any, default=None) -> Any:
    """Safe JSON parse for text DB fields."""
    if default is None:
        default = []
    try:
        return json.loads(val) if val else default
    except Exception:
        return default


# ── Pydantic request schemas ──────────────────────────────────────────────────

class SubmitRequest(BaseModel):
    name: str
    description: str
    tags: List[str] = []
    stack: Optional[str] = None
    files: List[Any] = []
    author_email: str


class TelemetryRequest(BaseModel):
    slug: str
    source: str = "cli"
