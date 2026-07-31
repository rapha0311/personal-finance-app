from sqlalchemy.orm import Session

from app.models.goal import Goal


def create_goal(db: Session, goal: Goal):

    db.add(goal)

    db.commit()

    db.refresh(goal)

    return goal


def get_goals(db: Session):

    return db.query(Goal).all()


def get_goal_by_id(db: Session, goal_id: int):

    return db.query(Goal).filter(Goal.id == goal_id).first()


def update_goal(db: Session, goal: Goal):

    db.commit()
    db.refresh(goal)

    return goal


def delete_goal(db: Session, goal: Goal):

    db.delete(goal)

    db.commit()


def get_active_goals(db: Session):

    return db.query(Goal).filter(Goal.completed.is_(False)).count()
