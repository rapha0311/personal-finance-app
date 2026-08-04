from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.repositories.transaction_repository import (
    create_transaction,
    get_transactions,
    get_transaction_by_id,
    delete_transaction,
    get_total_income,
    get_total_expenses,
    update_transaction,
    get_expenses_by_category,
    get_monthly_report,
    get_top_expenses,
    get_average_daily_expense,
)

from app.repositories.category_repository import get_category_by_id
from app.services.goal_transaction_service import (
    link_transaction_to_goal,
    unlink_transaction_from_goals,
)


def create_new_transaction(
    db: Session,
    title: str,
    amount: float,
    transaction_date,
    transaction_type: str,
    category_id: int,
    goal_id: int = None,
    goal_amount: float = None,
):

    category = get_category_by_id(db, category_id)

    if not category:

        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    transaction = create_transaction(
        db,
        title,
        amount,
        transaction_date,
        transaction_type,
        category_id,
    )

    if transaction_type == "income" and goal_id and goal_amount:
        link_transaction_to_goal(
            db=db,
            goal_id=goal_id,
            transaction_id=transaction.id,
            amount_used=goal_amount,
        )

    return transaction


def list_transactions(
    db,
    page,
    page_size,
    transaction_type=None,
    category_id=None,
    start_date=None,
    end_date=None,
    search=None,
):

    return get_transactions(
        db,
        page,
        page_size,
        transaction_type,
        category_id,
        start_date,
        end_date,
        search,
    )


def get_transaction(db: Session, transaction_id: int):

    transaction = get_transaction_by_id(db, transaction_id)

    if not transaction:

        raise HTTPException(status_code=404, detail="Transação não encontrada")

    return transaction


def remove_transaction(db: Session, transaction_id: int):

    transaction = get_transaction_by_id(db, transaction_id)

    if not transaction:

        raise HTTPException(status_code=404, detail="Transação não encontrada")

    unlink_transaction_from_goals(
        db,
        transaction.id,
    )

    delete_transaction(db, transaction)

    return {"message": "Transação removida"}


def get_summary(
    db: Session,
    start_date=None,
    end_date=None,
):

    income = get_total_income(
        db,
        start_date,
        end_date,
    )

    expenses = get_total_expenses(
        db,
        start_date,
        end_date,
    )

    balance = float(income) - float(expenses)

    return {
        "income": income,
        "expenses": expenses,
        "balance": balance,
    }


def edit_transaction(
    db: Session,
    transaction_id: int,
    title: str,
    amount: float,
    transaction_date,
    transaction_type: str,
    category_id: int,
    goal_id=None,
    goal_amount=None,
):

    transaction = get_transaction_by_id(db, transaction_id)

    if not transaction:

        raise HTTPException(status_code=404, detail="Transação não encontrada")

    category = get_category_by_id(db, category_id)

    if not category:

        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    updated_transaction = update_transaction(
        db,
        transaction,
        title,
        amount,
        transaction_date,
        transaction_type,
        category_id,
    )

    unlink_transaction_from_goals(
        db,
        updated_transaction.id,
    )

    if transaction_type == "income" and goal_id and goal_amount:

        link_transaction_to_goal(
            db,
            goal_id,
            updated_transaction.id,
            goal_amount,
        )

    return updated_transaction


def get_category_expenses(db: Session, start_date=None, end_date=None):

    data = get_expenses_by_category(db, start_date, end_date)

    return [{"category": item[0], "total": float(item[1])} for item in data]


def get_monthly_financial_report(db: Session):

    report = get_monthly_report(db)

    result = []

    for row in report:

        income = float(row.income or 0)

        expense = float(row.expense or 0)

        result.append(
            {
                "month": f"{int(row.year)}-{int(row.month):02d}",
                "income": income,
                "expense": expense,
                "balance": income - expense,
            }
        )

    return result


def get_monthly_comparison(db: Session):

    report = get_monthly_financial_report(db)

    if len(report) < 2:

        return {"income_change": 0, "expense_change": 0, "balance_change": 0}

    current = report[-1]

    previous = report[-2]

    def calculate_change(current_value, previous_value):

        if previous_value == 0:

            return 100 if current_value > 0 else 0

        # Evita distorções quando o mês anterior é negativo
        if previous_value < 0:

            return round((current_value - previous_value), 2)

        return round(((current_value - previous_value) / previous_value) * 100, 2)

    return {
        "income_change": calculate_change(current["income"], previous["income"]),
        "expense_change": calculate_change(current["expense"], previous["expense"]),
        "balance_change": calculate_change(current["balance"], previous["balance"]),
    }


def get_executive_summary(db: Session):

    summary = get_summary(db)

    categories = get_category_expenses(db)

    biggest_category = None

    if categories:

        biggest_category = max(categories, key=lambda x: x["total"])

    return {
        "income": summary["income"],
        "expenses": summary["expenses"],
        "balance": summary["balance"],
        "biggest_category": biggest_category,
    }


def get_top_categories(db: Session):

    return sorted(
        get_category_expenses(db),
        key=lambda x: x["total"],
        reverse=True,
    )[:5]


def get_top_expenses_service(db: Session):

    expenses = get_top_expenses(db)

    result = []

    for expense in expenses:

        result.append(
            {
                "id": expense.id,
                "title": expense.title,
                "amount": float(expense.amount),
                "transaction_date": expense.transaction_date,
                "category": expense.category,
            }
        )

    return result


def get_dashboard_kpis(db: Session):

    summary = get_summary(db)

    categories = get_category_expenses(db)

    biggest_category = max(categories, key=lambda x: x["total"]) if categories else None

    average_daily = get_average_daily_expense(db)

    return {
        "current_balance": summary["balance"],
        "average_daily_expense": average_daily,
        "biggest_category": biggest_category,
    }
