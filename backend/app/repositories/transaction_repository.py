from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy import extract
from sqlalchemy import case

from app.models.transaction import Transaction
from app.models.category import Category
from app.models.goal_transaction import GoalTransaction


def create_transaction(
    db: Session,
    title: str,
    amount: float,
    transaction_date,
    transaction_type: str,
    category_id: int,
):

    transaction = Transaction(
        title=title,
        amount=amount,
        transaction_date=transaction_date,
        transaction_type=transaction_type,
        category_id=category_id,
    )

    db.add(transaction)

    db.commit()

    db.refresh(transaction)

    return transaction


def get_transactions(
    db: Session,
    skip: int = 0,
    limit: int = 20,
    transaction_type: str = None,
    category_id: int = None,
    start_date=None,
    end_date=None,
):

    query = db.query(
        Transaction,
        GoalTransaction.goal_id,
        GoalTransaction.amount_used,
    ).outerjoin(
        GoalTransaction,
        GoalTransaction.transaction_id == Transaction.id,
    )

    if transaction_type:
        query = query.filter(Transaction.transaction_type == transaction_type)

    if category_id:
        query = query.filter(Transaction.category_id == category_id)

    if start_date:
        query = query.filter(Transaction.transaction_date >= start_date)

    if end_date:
        query = query.filter(Transaction.transaction_date <= end_date)

    query = query.order_by(Transaction.transaction_date.desc())

    rows = query.offset(skip)

    if limit is not None:
        rows = rows.limit(limit)

    rows = rows.all()

    result = []

    for transaction, goal_id, amount_used in rows:

        item = transaction.__dict__.copy()

        item.pop("_sa_instance_state", None)

        item["goal_id"] = goal_id
        item["goal_amount"] = amount_used

        result.append(item)

    return result


def get_transaction_by_id(db: Session, transaction_id: int):

    return db.query(Transaction).filter(Transaction.id == transaction_id).first()


def delete_transaction(db: Session, transaction: Transaction):

    db.delete(transaction)

    db.commit()


def get_total_income(db: Session, start_date=None, end_date=None):

    query = db.query(func.sum(Transaction.amount)).filter(
        Transaction.transaction_type == "income"
    )

    if start_date:

        query = query.filter(Transaction.transaction_date >= start_date)

    if end_date:

        query = query.filter(Transaction.transaction_date <= end_date)

    total = query.scalar()

    return total or 0


def get_total_expenses(db: Session, start_date=None, end_date=None):

    query = db.query(func.sum(Transaction.amount)).filter(
        Transaction.transaction_type == "expense"
    )

    if start_date:

        query = query.filter(Transaction.transaction_date >= start_date)

    if end_date:

        query = query.filter(Transaction.transaction_date <= end_date)

    total = query.scalar()

    return total or 0


def get_total_expenses_by_category(db: Session, category_id: int):

    total = (
        db.query(func.sum(Transaction.amount))
        .filter(
            Transaction.category_id == category_id,
            Transaction.transaction_type == "expense",
        )
        .scalar()
    )

    return total or 0


def get_top_expenses(db: Session, limit: int = 5):

    return (
        db.query(
            Transaction.id,
            Transaction.title,
            Transaction.amount,
            Transaction.transaction_date,
            Category.name.label("category"),
        )
        .join(Category, Transaction.category_id == Category.id)
        .filter(Transaction.transaction_type == "expense")
        .order_by(Transaction.amount.desc())
        .limit(limit)
        .all()
    )


def update_transaction(
    db: Session,
    transaction: Transaction,
    title: str,
    amount: float,
    transaction_date,
    transaction_type: str,
    category_id: int,
):

    transaction.title = title

    transaction.amount = amount

    transaction.transaction_date = transaction_date

    transaction.transaction_type = transaction_type

    transaction.category_id = category_id

    db.commit()

    db.refresh(transaction)

    return transaction


def get_expenses_by_category(db: Session, start_date=None, end_date=None):

    query = (
        db.query(Category.name, func.sum(Transaction.amount))
        .join(Category, Transaction.category_id == Category.id)
        .filter(Transaction.transaction_type == "expense")
    )

    if start_date:

        query = query.filter(Transaction.transaction_date >= start_date)

    if end_date:

        query = query.filter(Transaction.transaction_date <= end_date)

    return query.group_by(Category.name).all()


def get_monthly_report(db: Session):

    return (
        db.query(
            extract("year", Transaction.transaction_date).label("year"),
            extract("month", Transaction.transaction_date).label("month"),
            func.sum(
                case(
                    (Transaction.transaction_type == "income", Transaction.amount),
                    else_=0,
                )
            ).label("income"),
            func.sum(
                case(
                    (Transaction.transaction_type == "expense", Transaction.amount),
                    else_=0,
                )
            ).label("expense"),
        )
        .group_by(
            extract("year", Transaction.transaction_date),
            extract("month", Transaction.transaction_date),
        )
        .order_by(
            extract("year", Transaction.transaction_date),
            extract("month", Transaction.transaction_date),
        )
        .all()
    )
