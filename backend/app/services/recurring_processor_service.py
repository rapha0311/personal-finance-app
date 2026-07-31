from datetime import date
from dateutil.relativedelta import relativedelta
from datetime import timedelta

from app.models.transaction import Transaction
from app.repositories.recurring_transaction_repository import (
    get_recurring_transactions,
    update_recurring_transaction,
    get_active_recurring_transactions,
)


def process_recurring_transactions(db):

    today = date.today()

    recurring_list = get_recurring_transactions(db)

    for recurring in recurring_list:

        if not recurring.active:
            continue

        if recurring.next_execution > today:
            continue

        transaction = Transaction(
            title=recurring.title,
            amount=recurring.amount,
            transaction_type=recurring.transaction_type,
            category_id=recurring.category_id,
            transaction_date=recurring.next_execution,
        )

        db.add(transaction)

        recurring.last_generated = today

        if recurring.frequency == "monthly":

            recurring.next_execution += relativedelta(months=1)

        elif recurring.frequency == "weekly":

            recurring.next_execution += relativedelta(weeks=1)

        elif recurring.frequency == "daily":

            recurring.next_execution += relativedelta(days=1)

        elif recurring.frequency == "yearly":

            recurring.next_execution += relativedelta(years=1)

        update_recurring_transaction(db, recurring)

    db.commit()

    def pay_bill(db, bill_id):
        bill.paid = True

        bill.paid_date = date.today()
        Transaction(
            title=bill.title,
            amount=bill.amount,
            transaction_type="expense",
            category_id=bill.category_id,
            transaction_date=date.today(),
        )
