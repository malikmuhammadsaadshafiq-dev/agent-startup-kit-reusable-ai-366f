import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from models import WorkflowRow, SubmitRequest, jparse

router = APIRouter()


# ── Serialisation helpers ─────────────────────────────────────────────────────

def _summary(row: WorkflowRow) -> dict:
    return {
        "id": row.id, "slug": row.slug, "title": row.title,
        "description": row.description or "",
        "tags": jparse(row.tags), "stack": row.stack or "",
        "status": row.status, "author": row.author or "",
        "install_count": row.install_count,
        "created_at": row.created_at.isoformat() if row.created_at else None,
    }


def _detail(row: WorkflowRow) -> dict:
    return {
        **_summary(row),
        "files": jparse(row.files),
        "prompts": jparse(row.prompts),
        "readme": row.readme or "",
    }


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("")
def list_workflows(
    tag: Optional[str] = Query(None, description="Filter by tag"),
    stack: Optional[str] = Query(None, description="Filter by stack (nextjs, fastapi, ...)"),
    db: Session = Depends(get_db),
):
    """List all published workflows, optionally filtered by tag and/or stack."""
    q = db.query(WorkflowRow).filter(WorkflowRow.status == "PUBLISHED")
    if stack:
        q = q.filter(WorkflowRow.stack == stack)
    rows = q.order_by(WorkflowRow.install_count.desc()).all()
    if tag:
        rows = [r for r in rows if tag in jparse(r.tags)]
    return [_summary(r) for r in rows]


@router.post("/submit", status_code=201)
def submit_workflow(body: SubmitRequest, db: Session = Depends(get_db)):
    """Submit a community workflow for moderation (status = PENDING)."""
    slug = body.name.lower().replace(" ", "-").replace("_", "-")
    if db.query(WorkflowRow).filter(WorkflowRow.slug == slug).first():
        raise HTTPException(409, detail=f"Slug '{slug}' already exists")
    row = WorkflowRow(
        slug=slug, title=body.name, description=body.description,
        tags=json.dumps(body.tags), stack=body.stack or "",
        files=json.dumps(body.files), prompts="[]", readme="",
        status="PENDING", author=body.author_email, install_count=0,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return {"id": row.id, "slug": row.slug, "status": "PENDING",
            "message": "Submitted for review — we'll publish within 48 h."}


@router.get("/{slug}/install")
def install_manifest(slug: str, db: Session = Depends(get_db)):
    """Return the install manifest (files + prompts) consumed by the CLI."""
    row = db.query(WorkflowRow).filter(WorkflowRow.slug == slug).first()
    if not row:
        raise HTTPException(404, detail=f"Workflow '{slug}' not found")
    return {
        "slug": row.slug, "title": row.title,
        "files": jparse(row.files),
        "prompts": jparse(row.prompts),
        "readme": row.readme or "",
    }


@router.get("/{slug}")
def get_workflow(slug: str, db: Session = Depends(get_db)):
    """Get full workflow detail including files, prompts, and README."""
    row = db.query(WorkflowRow).filter(
        WorkflowRow.slug == slug, WorkflowRow.status == "PUBLISHED"
    ).first()
    if not row:
        raise HTTPException(404, detail=f"Workflow '{slug}' not found")
    return _detail(row)
