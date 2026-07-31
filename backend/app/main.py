from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from app.database.connection import Base
from app.database.connection import engine

from app.models.user import User
from app.models.category import Category
from app.models.transaction import Transaction
from app.models.goal import Goal
from app.models.goal_transaction import GoalTransaction
from app.models.recurring_transaction import RecurringTransaction
from app.models.bill import Bill

from app.routes.category_routes import router as category_router
from app.routes.transaction_routes import router as transaction_router
from app.routes.goal_routes import router as goal_router
from app.routes.report_routes import router as report_router
from app.routes.analytics_routes import router as analytics_router
from app.routes.goal_transaction_routes import router as goal_transaction_router

from app.routes.recurring_transaction_routes import router as recurring_router
from app.routes.recurring_processor_routes import router as recurring_processor_router

from app.routes.dashboard_routes import router as dashboard_router

from app.routes.bill_routes import router as bill_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(category_router)
app.include_router(transaction_router)
app.include_router(goal_router)
app.include_router(goal_transaction_router)
app.include_router(report_router)
app.include_router(analytics_router)
app.include_router(recurring_router)
app.include_router(recurring_processor_router)
app.include_router(dashboard_router)
app.include_router(bill_router)


@app.get("/")
def home():
    return {"message": "API funcionando"}
