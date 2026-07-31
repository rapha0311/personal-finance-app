from app.models.recurring_transaction import RecurringTransaction

from app.repositories.recurring_transaction_repository import (
    create_recurring_transaction,
    get_recurring_transactions,
    get_recurring_transaction_by_id,
    update_recurring_transaction,
    delete_recurring_transaction,
)


def create_recurring(db, data):

    recurring = RecurringTransaction(**data.dict())

    return create_recurring_transaction(db, data)


def list_recurring(db):

    return get_recurring_transactions(db)


def get_all_recurring(db):

    return get_recurring_transactions(db)


def remove_recurring(db, recurring_id):

    recurring = get_recurring_transaction_by_id(db, recurring_id)

    if recurring:

        delete_recurring_transaction(db, recurring)

    return recurring
