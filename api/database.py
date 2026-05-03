import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# Use /tmp on Vercel (read-only fs), local file otherwise
_db_file = "/tmp/agent_kit.db" if os.getenv("VERCEL") else "./agent_kit.db"
DB_URL = os.getenv("DATABASE_URL", f"sqlite:///{_db_file}")

engine = create_engine(
    DB_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DB_URL else {},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
