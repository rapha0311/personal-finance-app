from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

# from app.services.analytics_service import get_executive_summary, get_top_categories

router = APIRouter(prefix="/analytics", tags=["Analytics"])


# @router.get("/executive-summary")
# def executive_summary(db: Session = Depends(get_db)):
#     return get_executive_summary(db)


@router.get("/top-categories")
def top_categories(db: Session = Depends(get_db)):
    return get_top_categories(db)
