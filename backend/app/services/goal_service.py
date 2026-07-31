from app.services.goal_transaction_service import get_goal_progress

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.goal import Goal
from app.utils.goal_calculator import calculate_goal_progress

from app.repositories.goal_repository import (
    create_goal,
    get_goals,
    get_goal_by_id,
    update_goal,
    delete_goal,
)


def create_new_goal(db: Session, data):

    goal = Goal(
        title=data.title,
        target_amount=data.target_amount,
        current_amount=data.current_amount,
        target_date=data.target_date,
        category_id=data.category_id,
    )

    return create_goal(db, goal)


def list_goals(db: Session):

    return get_goals(db)


def get_goals_progress(db: Session):

    goals = get_goals(db)

    result = []

    for goal in goals:

        current_amount = get_goal_progress(
            db,
            goal.id,
        )

        progress = calculate_goal_progress(
            target_amount=goal.target_amount,
            current_amount=current_amount,
            target_date=goal.target_date,
            completed=goal.completed,
        )

        result.append(
            {
                "id": goal.id,
                "title": goal.title,
                "target_amount": goal.target_amount,
                "current_amount": current_amount,
                "remaining": progress["remaining"],
                "percentage": progress["percentage"],
                "target_date": goal.target_date,
                "days_left": progress["days_left"],
                "completed": goal.completed,
                "status": progress["status"],
            }
        )

    return result


def remove_goal(db: Session, goal_id: int):

    goal = get_goal_by_id(db, goal_id)

    if not goal:

        raise HTTPException(
            status_code=404,
            detail="Meta não encontrada",
        )

    delete_goal(db, goal)

    return {"message": "Meta removida"}


def edit_goal(db: Session, goal_id: int, data):

    goal = get_goal_by_id(db, goal_id)

    if not goal:

        raise HTTPException(
            status_code=404,
            detail="Meta não encontrada",
        )

    goal.title = data.title
    goal.target_amount = data.target_amount
    goal.current_amount = data.current_amount
    goal.target_date = data.target_date
    goal.category_id = data.category_id

    return update_goal(db, goal)


def get_financial_alerts(db: Session):

    goals = get_goals_progress(db)

    alerts = []

    for goal in goals:

        if goal["status"] == "danger":

            alerts.append(f'A meta "{goal["title"]}" ultrapassou o valor planejado.')

        elif goal["status"] == "warning":

            alerts.append(
                f'A meta "{goal["title"]}" já atingiu {goal["percentage"]:.0f}% do valor planejado.'
            )

    return alerts
