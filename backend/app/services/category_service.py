from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.repositories.category_repository import (
    create_category,
    get_categories,
    get_category_by_id,
    delete_category,
    update_category,
)

from app.schemas.category_schema import CategoryCreate
from app.models.category import Category


def create_new_category(db: Session, data: CategoryCreate):

    category = Category(name=data.name, type=data.type)

    return create_category(db, category)


def list_categories(db: Session):

    return get_categories(db)


def remove_category(db: Session, category_id: int):

    category = get_category_by_id(db, category_id)

    if not category:

        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    delete_category(db, category)

    return {"message": "Categoria removida"}


def get_category(db: Session, category_id: int):

    category = get_category_by_id(db, category_id)

    if not category:

        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    return category


def edit_category(db: Session, category_id: int, name: str, type: str):

    category = get_category_by_id(db, category_id)

    if not category:

        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    return update_category(db, category, name, type)
