from sqlalchemy.orm import Session

from app.models.recurring_transaction import RecurringTransaction


def create_recurring_transaction(db, data):

    recurring = RecurringTransaction(**data.dict())

    db.add(recurring)

    db.commit()

    db.refresh(recurring)

    return recurring


def get_recurring_transactions(db):

    return db.query(RecurringTransaction).all()


def get_recurring_transaction_by_id(db: Session, recurring_id: int):

    return (
        db.query(RecurringTransaction)
        .filter(RecurringTransaction.id == recurring_id)
        .first()
    )


def update_recurring_transaction(db: Session, recurring):

    db.commit()

    db.refresh(recurring)

    return recurring


def delete_recurring_transaction(db: Session, recurring):

    db.delete(recurring)

    db.commit()


def get_active_recurring_transactions(db):

    return (
        db.query(RecurringTransaction).filter(RecurringTransaction.active == True).all()
    )
