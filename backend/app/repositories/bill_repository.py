from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.bill import Bill


def create_bill(db: Session, bill: Bill):

    db.add(bill)

    db.commit()

    db.refresh(bill)

    return bill


def get_bills(db: Session):

    return db.query(Bill).all()


def get_bill_by_id(db: Session, bill_id: int):

    return db.query(Bill).filter(Bill.id == bill_id).first()


def update_bill(db: Session, bill: Bill):

    db.commit()

    db.refresh(bill)

    return bill


def delete_bill(db: Session, bill: Bill):

    db.delete(bill)

    db.commit()


def save_bill(db: Session, bill: Bill):

    db.commit()

    db.refresh(bill)

    return bill


def get_pending_bills(db: Session):

    return db.query(Bill).filter(Bill.paid == False).count()


def get_pending_amount(db: Session):

    total = db.query(func.sum(Bill.amount)).filter(Bill.paid == False).scalar()

    return float(total or 0)
