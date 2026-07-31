from app.repositories.transaction_repository import (
    get_total_income,
    get_total_expenses,
    get_expenses_by_category,
)

from app.services.transaction_service import get_monthly_financial_report


def get_executive_summary(db):

    income = get_total_income(db)

    expenses = get_total_expenses(db)

    balance = income - expenses

    categories = get_expenses_by_category(db)

    biggest_category = None

    if categories:

        biggest_category = max(categories, key=lambda x: x["total"])

    monthly_data = get_monthly_financial_report(db)

    monthly_average = 0

    if monthly_data:

        monthly_average = sum(item["balance"] for item in monthly_data) / len(
            monthly_data
        )

    savings_rate = 0

    if income > 0:

        savings_rate = round((balance / income) * 100, 2)

    return {
        "income": income,
        "expenses": expenses,
        "balance": balance,
        "monthly_average": round(monthly_average, 2),
        "savings_rate": savings_rate,
        "biggest_category": biggest_category,
    }


def get_top_categories(db):

    categories = get_expenses_by_category(db)

    categories.sort(key=lambda x: x["total"], reverse=True)

    return categories[:5]
