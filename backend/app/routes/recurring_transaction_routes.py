from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.recurring_transaction_schema import RecurringTransactionCreate

from app.services.recurring_transaction_service import (
    create_recurring,
    remove_recurring,
    list_recurring,
)

router = APIRouter(prefix="/recurring-transactions", tags=["Recurring Transactions"])


@router.post("/")
def create(data: RecurringTransactionCreate, db: Session = Depends(get_db)):

    return create_recurring(db, data)


@router.delete("/{recurring_id}")
def delete(recurring_id: int, db: Session = Depends(get_db)):

    return remove_recurring(db, recurring_id)


@router.get("/")
def list_all(db: Session = Depends(get_db)):

    return list_recurring(db)
