from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean, Date

from sqlalchemy.orm import relationship

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Date
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

from app.database.connection import Base


class RecurringTransaction(Base):

    __tablename__ = "recurring_transactions"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    amount = Column(Float, nullable=False)

    transaction_type = Column(String, nullable=False)

    category_id = Column(Integer, ForeignKey("categories.id"))

    start_date = Column(Date)

    end_date = Column(Date, nullable=True)

    frequency = Column(String)

    next_execution = Column(Date, nullable=False)

    active = Column(Boolean, default=True)

    last_generated = Column(Date, nullable=True)

    category = relationship("Category")
