from datetime import date

from fastapi import HTTPException

from app.models.bill import Bill

from app.repositories.bill_repository import (
    create_bill,
    get_bills,
    get_bill_by_id,
    update_bill,
    delete_bill,
    save_bill,
)

from app.models.transaction import Transaction

from app.repositories.transaction_repository import create_transaction


def create_new_bill(db, data):

    if data.amount <= 0:

        raise HTTPException(
            status_code=400, detail="O valor da conta deve ser maior que zero."
        )

    bill = Bill(**data.dict())

    return create_bill(db, bill)


def list_bills(db):

    return get_bills(db)


def remove_bill(db, bill_id):

    bill = get_bill_by_id(db, bill_id)

    if not bill:

        raise HTTPException(status_code=404, detail="Conta não encontrada.")

    delete_bill(db, bill)

    return bill


def pay_bill(db, bill_id):

    bill = get_bill_by_id(db, bill_id)

    if not bill:

        raise HTTPException(status_code=404, detail="Conta não encontrada.")

    if bill.paid:

        raise HTTPException(status_code=400, detail="Esta conta já foi paga.")

        bill.paid = True
        bill.paid_date = date.today()

        save_bill(db, bill)

        transaction = Transaction(
            title=bill.title,
            amount=bill.amount,
            transaction_type="expense",
            category_id=bill.category_id,
            transaction_date=date.today(),
        )

        create_transaction(db, transaction)

        return {
            "message": "Conta paga com sucesso.",
            "bill": bill,
        }
