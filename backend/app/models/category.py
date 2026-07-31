from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Category(Base):

    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False, unique=True)

    type = Column(String, nullable=False)

    transactions = relationship(
        "Transaction",
        back_populates="category",
    )

    goals = relationship(
        "Goal",
        back_populates="category",
    )
