from pydantic import BaseModel


class GoalProgressResponse(BaseModel):

    id: int

    title: str

    target_amount: float

    current_amount: float

    progress: float

    remaining: float

    monthly_needed: float

    estimated_finish: str | None

    completed: bool
