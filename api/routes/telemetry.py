from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import WorkflowRow, InstallRow, TelemetryRequest

router = APIRouter()


@router.post("/telemetry/install", status_code=201)
def record_install(body: TelemetryRequest, db: Session = Depends(get_db)):
    """Record an anonymous install event and increment workflow install_count."""
    wf = db.query(WorkflowRow).filter(WorkflowRow.slug == body.slug).first()
    db.add(InstallRow(
        workflow_id=wf.id if wf else None,
        slug=body.slug,
        source=body.source,
        created_at=datetime.utcnow(),
    ))
    if wf:
        wf.install_count += 1
    db.commit()
    return {"recorded": True, "slug": body.slug, "source": body.source}


@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    """Return aggregate stats: total workflows, installs, top-5 by usage."""
    total_workflows = db.query(WorkflowRow).filter(
        WorkflowRow.status == "PUBLISHED"
    ).count()
    total_installs = db.query(InstallRow).count()
    top5 = (
        db.query(WorkflowRow)
        .filter(WorkflowRow.status == "PUBLISHED")
        .order_by(WorkflowRow.install_count.desc())
        .limit(5)
        .all()
    )
    return {
        "total_workflows": total_workflows,
        "total_installs": total_installs,
        "top_workflows": [
            {"slug": r.slug, "title": r.title, "install_count": r.install_count}
            for r in top5
        ],
    }
