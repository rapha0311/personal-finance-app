from pydantic import BaseModel


class BiggestCategoryResponse(BaseModel):
    category: str
    total: float


class DashboardSummaryResponse(BaseModel):

    current_balance: float

    monthly_income: float

    monthly_expenses: float

    pending_bills: int

    pending_amount: float

    active_goals: int

    forecast_next_month: float


class DashboardKPIsResponse(BaseModel):
    income: float
    expenses: float
    current_balance: float

    income_variation: float
    expense_variation: float

    pending_bills: int
    pending_amount: float

    active_goals: int

    average_daily_expense: float

    biggest_category: BiggestCategoryResponse | None
