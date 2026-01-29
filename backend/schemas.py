from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class TaskRead(BaseModel):
    id: str
    name: str
    description: str
    completed: bool
    remember: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class TaskCreate(BaseModel):
    name: str
    description: str
    remember: bool = False

class TaskUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    remember: Optional[bool] = None
    completed: Optional[bool] = None
