from datetime import date
from app.repositories.recurring_transaction_repository import (
    get_active_recurring_transactions,
)

from app.repositories.bill_repository import (
    get_pending_bills,
    get_pending_amount,
)

from app.repositories.goal_repository import (
    get_active_goals,
)

from app.repositories.transaction_repository import (
    get_monthly_report,
    get_total_income,
    get_total_expenses,
    get_expenses_by_category,
)


def get_net_worth(db):

    monthly = get_monthly_report(db)

    result = []

    accumulated = 0

    for item in monthly:

        income = float(item.income or 0)

        expense = float(item.expense or 0)

        balance = income - expense

        accumulated += balance

        result.append(
            {
                "month": f"{int(item.year)}-{int(item.month):02}",
                "balance": accumulated,
            }
        )

    return result


def get_current_balance(
    db,
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

    return float(income or 0) - float(expenses or 0)


def get_forecast(db):

    recurring = get_active_recurring_transactions(db)

    forecast = []

    current_date = date.today()

    for month_offset in range(6):

        month_income = 0
        month_expense = 0

        forecast_month = current_date.month + month_offset
        forecast_year = current_date.year

        while forecast_month > 12:

            forecast_month -= 12
            forecast_year += 1

        for item in recurring:

            forecast_date = date(
                forecast_year,
                forecast_month,
                1,
            )

            if item.next_execution:

                next_exec_month = date(
                    item.next_execution.year,
                    item.next_execution.month,
                    1,
                )

                if forecast_date < next_exec_month:
                    continue

            if item.start_date and forecast_date < item.start_date:
                continue

            if item.end_date and forecast_date > item.end_date:
                continue

            if item.frequency == "monthly":
                occurrences = 1

            elif item.frequency == "weekly":
                occurrences = 4

            elif item.frequency == "yearly":
                if item.start_date:
                    occurrences = 1 if forecast_month == item.start_date.month else 0

            else:

                occurrences = 0

            value = item.amount * occurrences

            if item.transaction_type == "income":

                month_income += value

            else:

                month_expense += value

        forecast.append(
            {
                "month": f"{forecast_year}-{forecast_month:02}",
                "income": month_income,
                "expense": month_expense,
                "balance": month_income - month_expense,
            }
        )

    return forecast


def get_dashboard_summary(
    db,
    start_date=None,
    end_date=None,
):

    forecast = get_forecast(db)

    next_month_balance = 0

    if len(forecast) > 1:

        next_month_balance = forecast[1]["balance"]

    return {
        "current_balance": float(get_total_income(db, start_date, end_date))
        - float(get_total_expenses(db, start_date, end_date)),
        "monthly_income": float(get_total_income(db, start_date, end_date) or 0),
        "monthly_expenses": float(get_total_expenses(db, start_date, end_date) or 0),
        "pending_bills": get_pending_bills(db),
        "pending_amount": get_pending_amount(db),
        "active_goals": get_active_goals(db),
        "forecast_next_month": next_month_balance,
    }


def get_category_expenses(
    db,
    start_date=None,
    end_date=None,
):

    data = get_expenses_by_category(
        db,
        start_date,
        end_date,
    )

    return [
        {
            "category": category,
            "total": float(total or 0),
        }
        for category, total in data
    ]
