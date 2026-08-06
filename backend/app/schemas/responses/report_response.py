from pydantic import BaseModel


class MonthlyReportResponse(BaseModel):

    month: str

    income: float

    expense: float

    balance: float
