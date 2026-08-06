from pydantic import BaseModel


class ExecutiveSummaryResponse(BaseModel):

    income: float

    expenses: float

    balance: float

    biggest_category: dict | None
