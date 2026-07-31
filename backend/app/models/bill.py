from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Date
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.database.connection import Base


class Bill(Base):

    __tablename__ = "bills"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    amount = Column(Float, nullable=False)

    due_date = Column(Date, nullable=False)

    paid = Column(Boolean, default=False)

    paid_date = Column(Date, nullable=True)

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False,
    )

    category = relationship("Category")
