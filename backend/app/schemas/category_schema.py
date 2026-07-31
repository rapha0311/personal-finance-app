from pydantic import BaseModel
from app.schemas.enums import TransactionType


class CategoryCreate(BaseModel):

    name: str

    type: TransactionType


class CategoryUpdate(BaseModel):

    name: str

    type: TransactionType


class CategoryResponse(BaseModel):
    id: int
    name: str
    type: TransactionType

    class Config:
        from_attributes = True
