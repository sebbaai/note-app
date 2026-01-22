from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['http://localhost:5173/', 'http://localhost:5173'], allow_credentials=True, allow_methods=['*'])
class Task(BaseModel):
    id: int
    name: str
    description: str
    date: str
    state: bool
    created_at: str
    update_at: str

def readJson() :
    with open('tasks.json', 'r') as archivo:
        try:
            tasks_list = json.load(archivo)
            return tasks_list
        except (FileNotFoundError, json.JSONDecodeError):
            tasks_list = []
            return tasks_list
        
def writeJson(contenido):
    with open('tasks.json', 'w') as archivo:
        json.dump(contenido, archivo, indent=4)

@app.get('/tasks')
async def get() :
    return readJson()
    
@app.post('/tasks')
async def users(task: Task) :
    tasks_list = readJson()
    task.id = max(task['id'] for task in tasks_list) + 1
    tasks_list.append(dict(task))
    writeJson(tasks_list)


@app.put('/tasks/{task_id}')
async def update_task(task_id: int, task: Task):
    tasks_list = readJson()
    for i, t in enumerate(tasks_list):
        if t['id'] == task_id:
            tasks_list[i] = dict(task)
            writeJson(tasks_list)

@app.delete('/tasks/{task_id}')
async def delete_task(task_id):
    tasks_list = readJson()
    for i, t in enumerate(tasks_list):
        if t['id'] == int(task_id) :
            del tasks_list[i]
    writeJson(tasks_list)
        



