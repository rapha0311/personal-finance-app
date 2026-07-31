from sqlalchemy.orm import Session

from app.models.goal_transaction import GoalTransaction

from app.repositories.goal_transaction_repository import (
    create_goal_transaction,
    get_goal_transactions_by_goal,
    get_goal_transactions_by_transaction,
    delete_goal_transaction,
)


def link_transaction_to_goal(
    db: Session,
    goal_id: int,
    transaction_id: int,
    amount_used: float,
):

    goal_transaction = GoalTransaction(
        goal_id=goal_id,
        transaction_id=transaction_id,
        amount_used=amount_used,
    )

    return create_goal_transaction(
        db,
        goal_transaction,
    )


def unlink_transaction_from_goals(
    db: Session,
    transaction_id: int,
):
    links = get_goal_transactions_by_transaction(
        db,
        transaction_id,
    )

    for link in links:
        delete_goal_transaction(
            db,
            link,
        )


def get_goal_progress(
    db: Session,
    goal_id: int,
):

    goal_transactions = get_goal_transactions_by_goal(
        db,
        goal_id,
    )

    total = sum(item.amount_used for item in goal_transactions)

    return total
