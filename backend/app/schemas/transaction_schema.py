from datetime import date
from typing import Optional

from pydantic import BaseModel

from app.schemas.enums import TransactionType


class TransactionCreate(BaseModel):

    title: str

    amount: float

    transaction_date: date

    category_id: int

    transaction_type: TransactionType

    goal_id: Optional[int] = None

    goal_amount: Optional[float] = None


class TransactionUpdate(BaseModel):

    title: str

    amount: float

    transaction_date: date

    transaction_type: TransactionType

    category_id: int

    goal_id: Optional[int] = None

    goal_amount: Optional[float] = None
