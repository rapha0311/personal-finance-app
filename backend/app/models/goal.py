from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    Date,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from app.database.connection import Base


class Goal(Base):

    __tablename__ = "goals"

    id = Column(Integer, primary_key=True)

    title = Column(String, nullable=False)

    target_amount = Column(Float, nullable=False)

    current_amount = Column(Float, default=0)

    target_date = Column(Date)

    completed = Column(Boolean, default=False)

    description = Column(String)

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False,
    )

    category = relationship(
        "Category",
        back_populates="goals",
    )

    goal_transactions = relationship(
        "GoalTransaction",
        back_populates="goal",
        cascade="all, delete-orphan",
    )
