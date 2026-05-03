"""Seed starter workflows into the DB on first cold start."""
from sqlalchemy.orm import Session
from models import WorkflowRow
from seed_data import RAW, serialize_workflow


def seed_workflows(db: Session) -> None:
    """Insert the 8 starter workflows if the table is empty."""
    if db.query(WorkflowRow).count() > 0:
        return
    for w in RAW:
        db.add(WorkflowRow(**serialize_workflow(w)))
    db.commit()
