from datetime import date

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.goal import Goal

from app.services.goal_transaction_service import (
    get_goal_progress,
)

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
        target_date=data.target_date,
        category_id=data.category_id,
    )

    return create_goal(db, goal)


def list_goals(db: Session):

    return get_goals(db)


def get_goals_progress(db: Session):

    goals = get_goals(db)

    today = date.today()

    result = []

    for goal in goals:

        target = float(goal.target_amount or 0)

        current = get_goal_progress(
            db,
            goal.id,
        )

        progress = 0

        if target > 0:
            progress = round(
                (current / target) * 100,
                1,
            )

        remaining = max(
            target - current,
            0,
        )

        monthly_needed = 0

        estimated_finish = None

        if goal.target_date:

            months_remaining = (goal.target_date.year - today.year) * 12 + (
                goal.target_date.month - today.month
            )

            months_remaining = max(
                months_remaining,
                1,
            )

            monthly_needed = round(
                remaining / months_remaining,
                2,
            )

            estimated_finish = goal.target_date.strftime("%m/%Y")

        result.append(
            {
                "id": goal.id,
                "title": goal.title,
                "target_amount": target,
                "current_amount": current,
                "progress": progress,
                "remaining": remaining,
                "monthly_needed": monthly_needed,
                "estimated_finish": estimated_finish,
                "completed": goal.completed,
            }
        )

    return result


def remove_goal(db: Session, goal_id: int):

    goal = get_goal_by_id(
        db,
        goal_id,
    )

    if not goal:

        raise HTTPException(
            status_code=404,
            detail="Meta não encontrada",
        )

    delete_goal(
        db,
        goal,
    )

    return {"message": "Meta removida"}


def edit_goal(
    db: Session,
    goal_id: int,
    data,
):

    goal = get_goal_by_id(
        db,
        goal_id,
    )

    if not goal:

        raise HTTPException(
            status_code=404,
            detail="Meta não encontrada",
        )

    goal.title = data.title
    goal.target_amount = data.target_amount
    goal.target_date = data.target_date
    goal.category_id = data.category_id

    return update_goal(
        db,
        goal,
    )


def get_financial_alerts(db: Session):

    goals = get_goals_progress(db)

    alerts = []

    for goal in goals:

        progress = goal["progress"]

        if goal["completed"]:

            alerts.append(
                {
                    "type": "success",
                    "icon": "🏆",
                    "title": "Meta concluída",
                    "message": (f'A meta "{goal["title"]}" ' "foi concluída."),
                }
            )

        elif progress >= 90:

            alerts.append(
                {
                    "type": "success",
                    "icon": "🎯",
                    "title": "Meta quase concluída",
                    "message": (
                        f'A meta "{goal["title"]}" '
                        f"já atingiu {progress:.0f}% "
                        "do objetivo."
                    ),
                }
            )

        elif progress >= 60:

            alerts.append(
                {
                    "type": "info",
                    "icon": "📈",
                    "title": "Bom progresso",
                    "message": (
                        f'A meta "{goal["title"]}" '
                        f"está com {progress:.0f}% "
                        "concluída."
                    ),
                }
            )

        elif progress < 20:

            alerts.append(
                {
                    "type": "warning",
                    "icon": "⚠️",
                    "title": "Meta parada",
                    "message": (
                        f'A meta "{goal["title"]}" '
                        f"ainda possui apenas "
                        f"{progress:.0f}% de progresso."
                    ),
                }
            )

    return alerts
