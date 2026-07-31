from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.bill_schema import BillCreate

from app.services.bill_service import create_new_bill, list_bills, remove_bill, pay_bill

router = APIRouter(
    prefix="/bills",
    tags=["Bills"],
)


@router.post("/")
def create(
    data: BillCreate,
    db: Session = Depends(get_db),
):

    return create_new_bill(db, data)


@router.get("/")
def get_all(
    db: Session = Depends(get_db),
):

    return list_bills(db)


@router.delete("/{bill_id}")
def delete(
    bill_id: int,
    db: Session = Depends(get_db),
):

    return remove_bill(db, bill_id)


@router.put("/{bill_id}/pay")
def pay(
    bill_id: int,
    db: Session = Depends(get_db),
):

    return pay_bill(db, bill_id)
