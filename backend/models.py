from sqlalchemy import Column, String, Boolean, Text, Date, DateTime
from database import base
from datetime import datetime, timezone
import uuid

class Task(base):
    __tablename__ = 'tasks'

    id = Column(String, index = True,  primary_key = True, default= lambda: str(uuid.uuid4()))
    name = Column(String, nullable = False)
    description = Column(Text, nullable = False)
    completed = Column(Boolean, nullable = False, default = False)
    remember = Column(Boolean, nullable = False, default = False)
    created_at = Column(DateTime(timezone=True), nullable = False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), nullable = False, default=lambda: datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))