from datetime import date

from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date


from sqlalchemy.orm import relationship

from app.database.connection import Base


class Transaction(Base):

    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True)

    title = Column(String, nullable=False)

    amount = Column(Float, nullable=False)

    transaction_date = Column(Date, nullable=False, default=date.today)

    transaction_type = Column(String, nullable=False)

    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    category = relationship("Category", back_populates="transactions")

    goal_transactions = relationship(
        "GoalTransaction", back_populates="transaction", cascade="all, delete-orphan"
    )
