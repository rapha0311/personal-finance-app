from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.goal_schema import GoalCreate, GoalUpdate

from app.services.goal_service import (
    create_new_goal,
    list_goals,
    get_goals_progress,
    remove_goal,
    edit_goal,
)

router = APIRouter()


@router.post("/goals")
def create_goal_route(goal: GoalCreate, db: Session = Depends(get_db)):

    return create_new_goal(db, goal)


@router.get("/goals")
def get_goals_route(db: Session = Depends(get_db)):

    return list_goals(db)


@router.get("/goals/progress")
def get_goals_progress_route(db: Session = Depends(get_db)):

    return get_goals_progress(db)


@router.put("/goals/{goal_id}")
def update_goal_route(
    goal_id: int,
    goal: GoalUpdate,
    db: Session = Depends(get_db),
):
    return edit_goal(db, goal_id, goal)


@router.delete("/goals/{goal_id}")
def delete_goal_route(goal_id: int, db: Session = Depends(get_db)):

    return remove_goal(db, goal_id)
