from fastapi import (
    APIRouter,
    Depends
)

from fastapi.responses import StreamingResponse

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.services.report_service import (
    generate_excel_report
)

router = APIRouter()

@router.get("/reports/export")
def export_report(
    db: Session = Depends(get_db)
):

    file = generate_excel_report(db)

    return StreamingResponse(
        file,
        media_type=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition":
            "attachment; filename=finance_report.xlsx"
        }
    )