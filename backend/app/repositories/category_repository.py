from sqlalchemy.orm import Session

from app.models.category import Category


def create_category(db: Session, category: Category):

    db.add(category)

    db.commit()

    db.refresh(category)

    return category


def get_category_by_id(db: Session, category_id: int):

    return db.query(Category).filter(Category.id == category_id).first()


def get_categories(db: Session):

    return db.query(Category).all()


def delete_category(db: Session, category: Category):

    db.delete(category)

    db.commit()


def update_category(db: Session, category: Category, name: str, type: str):

    category.name = name

    category.type = type

    db.commit()

    db.refresh(category)

    return category
