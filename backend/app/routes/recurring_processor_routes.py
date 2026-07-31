from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.services.recurring_processor_service import process_recurring_transactions

router = APIRouter(prefix="/recurring-processor", tags=["Recurring Processor"])


@router.post("/run")
def run_processor(db: Session = Depends(get_db)):

    process_recurring_transactions(db)

    return {"message": "Processamento concluído"}
