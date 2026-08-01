from datetime import date

from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.transaction_schema import TransactionCreate, TransactionUpdate

from app.services.transaction_service import (
    create_new_transaction,
    list_transactions,
    get_transaction,
    remove_transaction,
    get_summary,
    edit_transaction,
    get_category_expenses,
    get_monthly_financial_report,
    get_monthly_comparison,
    get_executive_summary,
    get_top_categories,
    get_top_expenses_service,
    get_dashboard_kpis,
)

from app.services.goal_service import get_financial_alerts

router = APIRouter()


@router.post("/transactions")
def create_transaction_route(
    transaction: TransactionCreate, db: Session = Depends(get_db)
):

    return create_new_transaction(
        db,
        transaction.title,
        transaction.amount,
        transaction.transaction_date,
        transaction.transaction_type,
        transaction.category_id,
        transaction.goal_id,
        transaction.goal_amount,
    )


@router.get("/transactions")
def get_transactions_route(
    skip: int = 0,
    limit: int = None,
    transaction_type: str = None,
    category_id: int = None,
    start_date: date = None,
    end_date: date = None,
    search: str = None,
    db: Session = Depends(get_db),
):

    return list_transactions(
        db,
        skip,
        limit,
        transaction_type,
        category_id,
        start_date,
        end_date,
        search,
    )


@router.get("/transactions/{transaction_id}")
def get_transaction_route(transaction_id: int, db: Session = Depends(get_db)):

    return get_transaction(db, transaction_id)


@router.delete("/transactions/{transaction_id}")
def delete_transaction_route(transaction_id: int, db: Session = Depends(get_db)):

    return remove_transaction(db, transaction_id)


@router.get("/transactions/summary")
def summary_route(
    start_date: date = None, end_date: date = None, db: Session = Depends(get_db)
):

    return get_summary(db, start_date, end_date)


@router.put("/transactions/{transaction_id}")
def update_transaction_route(
    transaction_id: int, transaction: TransactionUpdate, db: Session = Depends(get_db)
):

    return edit_transaction(
        db,
        transaction_id,
        transaction.title,
        transaction.amount,
        transaction.transaction_date,
        transaction.transaction_type,
        transaction.category_id,
        transaction.goal_id,
        transaction.goal_amount,
    )


@router.get("/dashboard/categories")
def category_expenses_route(
    start_date: date = None, end_date: date = None, db: Session = Depends(get_db)
):

    return get_category_expenses(db, start_date, end_date)


@router.get("/reports/monthly")
def monthly_report_route(db: Session = Depends(get_db)):

    return get_monthly_financial_report(db)


@router.get("/dashboard/comparison")
def comparison_route(db: Session = Depends(get_db)):

    return get_monthly_comparison(db)


@router.get("/dashboard/alerts")
def alerts_route(db: Session = Depends(get_db)):

    return get_financial_alerts(db)


@router.get("/analytics/executive-summary")
def executive_summary_route(db: Session = Depends(get_db)):

    return get_executive_summary(db)


@router.get("/analytics/top-categories")
def top_categories_route(db: Session = Depends(get_db)):

    return get_top_categories(db)


@router.get("/analytics/top-expenses")
def top_expenses_route(db: Session = Depends(get_db)):

    return get_top_expenses_service(db)


@router.get("/dashboard/kpis")
def dashboard_kpis_route(db: Session = Depends(get_db)):

    return get_dashboard_kpis(db)
