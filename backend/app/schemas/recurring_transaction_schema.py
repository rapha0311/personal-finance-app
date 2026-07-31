from datetime import date

from pydantic import BaseModel

from app.schemas.enums import (
    TransactionType,
    FrequencyType,
)


class RecurringTransactionCreate(BaseModel):

    title: str

    amount: float

    transaction_type: TransactionType

    category_id: int

    start_date: date

    end_date: date | None = None

    frequency: FrequencyType

    next_execution: date

    active: bool = True


class RecurringTransactionResponse(RecurringTransactionCreate):

    id: int

    class Config:

        from_attributes = True
