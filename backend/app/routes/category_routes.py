from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.category_schema import CategoryCreate, CategoryUpdate

from app.services.category_service import (
    create_new_category,
    list_categories,
    remove_category,
    get_category,
    edit_category,
)

router = APIRouter()


@router.post("/categories")
def create_category_route(category: CategoryCreate, db: Session = Depends(get_db)):

    return create_new_category(db, category)


@router.get("/categories")
def get_categories_route(db: Session = Depends(get_db)):

    return list_categories(db)


@router.delete("/categories/{category_id}")
def delete_category_route(category_id: int, db: Session = Depends(get_db)):

    return remove_category(db, category_id)


@router.get("/categories/{category_id}")
def get_category_route(category_id: int, db: Session = Depends(get_db)):

    return get_category(db, category_id)


@router.put("/categories/{category_id}")
def update_category_route(
    category_id: int, category: CategoryUpdate, db: Session = Depends(get_db)
):

    return edit_category(db, category_id, category.name, category.type)
