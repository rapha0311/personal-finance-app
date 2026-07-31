from enum import Enum


class TransactionType(str, Enum):
    income = "income"
    expense = "expense"


class FrequencyType(str, Enum):

    weekly = "weekly"

    monthly = "monthly"

    yearly = "yearly"
