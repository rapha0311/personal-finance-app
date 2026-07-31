from sqlalchemy.orm import Session

from app.models.goal_transaction import GoalTransaction


def create_goal_transaction(db: Session, goal_transaction: GoalTransaction):

    db.add(goal_transaction)

    db.commit()

    db.refresh(goal_transaction)

    return goal_transaction


def get_goal_transactions_by_goal(db: Session, goal_id: int):

    return db.query(GoalTransaction).filter(GoalTransaction.goal_id == goal_id).all()


def get_goal_transactions_by_transaction(db: Session, transaction_id: int):

    return (
        db.query(GoalTransaction)
        .filter(GoalTransaction.transaction_id == transaction_id)
        .all()
    )


def delete_goal_transaction(db: Session, goal_transaction: GoalTransaction):

    db.delete(goal_transaction)

    db.commit()
