from pydantic import BaseModel


class GoalTransactionCreate(BaseModel):
    goal_id: int
    transaction_id: int
    amount_used: float
