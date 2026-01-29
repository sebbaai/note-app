from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, base, engine
from models import Task

from schemas import TaskRead, TaskCreate, TaskUpdate
base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['http://localhost:5173/', 'http://localhost:5173'], allow_credentials=True, allow_methods=['*'])

@app.get('/')
async def get():
    return {'hola', 'puto'}
@app.get('/tasks', response_model=list[TaskRead])
async def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks
@app.get('/tasks/{id_task}', response_model=TaskRead)
async def get_task(id_task: str, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == id_task).first()
    if not task:
        raise HTTPException(status_code=404, detail='Tarea no encontrada')
    return task
@app.post('/tasks', response_model=TaskRead)
async def post_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task
@app.patch('/tasks/{task_id}', response_model=TaskRead)
async def put_task(task_id: str, task: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    datos = task.model_dump(exclude_unset=True)
    for key, value in datos.items():
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    return db_task
@app.delete('/tasks/{task_id}')
async def delete_task(task_id: str, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    db.delete(task)
    db.commit()
