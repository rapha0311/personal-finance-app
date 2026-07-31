from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.goal_transaction_schema import GoalTransactionCreate
from app.services.goal_transaction_service import link_transaction_to_goal

router = APIRouter(tags=["Goal Transactions"])


@router.post("/goal-transactions")
def create_goal_transaction(
    data: GoalTransactionCreate,
    db: Session = Depends(get_db),
):
    return link_transaction_to_goal(
        db=db,
        goal_id=data.goal_id,
        transaction_id=data.transaction_id,
        amount_used=data.amount_used,
    )
