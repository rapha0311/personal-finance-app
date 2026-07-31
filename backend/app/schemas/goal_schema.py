from datetime import date
from pydantic import BaseModel


class GoalCreate(BaseModel):

    title: str

    target_amount: float

    current_amount: float = 0

    target_date: date | None = None

    category_id: int


class GoalUpdate(BaseModel):

    title: str

    target_amount: float

    current_amount: float

    target_date: date | None = None

    completed: bool = False

    category_id: int
