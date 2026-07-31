from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.connection import Base


class GoalTransaction(Base):

    __tablename__ = "goal_transactions"

    id = Column(Integer, primary_key=True)

    goal_id = Column(
        Integer,
        ForeignKey("goals.id"),
        nullable=False,
    )

    transaction_id = Column(
        Integer,
        ForeignKey("transactions.id"),
        nullable=False,
    )

    amount_used = Column(
        Float,
        nullable=False,
    )

    goal = relationship("Goal", back_populates="goal_transactions")

    transaction = relationship("Transaction", back_populates="goal_transactions")
