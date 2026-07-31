from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from app.database.connection import get_db

from app.services.dashboard_service import (
    get_net_worth,
    get_forecast,
    get_dashboard_summary,
)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/categories")
def categories(
    start_date: date = None, end_date: date = None, db: Session = Depends(get_db)
):
    return get_category_expenses(db, start_date, end_date)


@router.get("/net-worth")
def net_worth(db: Session = Depends(get_db)):
    return get_net_worth(db)


@router.get("/forecast")
def forecast(db: Session = Depends(get_db)):
    return get_forecast(db)


from datetime import date


@router.get("/summary")
def summary(
    start_date: date = None,
    end_date: date = None,
    db: Session = Depends(get_db),
):
    return get_dashboard_summary(
        db,
        start_date,
        end_date,
    )
