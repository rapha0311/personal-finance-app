from pydantic import BaseModel
from datetime import date


class BillCreate(BaseModel):

    title: str

    amount: float

    due_date: date

    category_id: int


class BillResponse(BillCreate):

    id: int

    paid: bool

    paid_date: date | None = None

    class Config:

        from_attributes = True
