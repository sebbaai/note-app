from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['http://localhost:5173/', 'http://localhost:5173'], allow_credentials=True, allow_methods=['*'])
class Task(BaseModel):
    name: str
    description: str
    date: str
    state: bool
    created_at: str
    update_at: str

userslist = []

@app.get('/tasks')
async def get() :
    return userslist

@app.post('/tasks')
async def users(task: Task) :
    userslist.append(task)