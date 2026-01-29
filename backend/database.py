from sqlalchemy import create_engine # Canal fisico entre python y db
from sqlalchemy.orm import sessionmaker, declarative_base
DB_URL = 'sqlite:///./tasks.db'
engine = create_engine(DB_URL, connect_args={'check_same_thread': False})
session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
base = declarative_base()
def get_db():
    try:
        db = session()
        yield db
    finally:
        db.close()