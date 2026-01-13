from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['http://localhost:5173/', 'http://localhost:5173'], allow_credentials=True, allow_methods=['*'])
class User(BaseModel):
    name: str
    surname: str
    age: int

userslist = []

@app.get('/')
async def get() :
    return userslist

@app.post('/users')
async def users(user: User) :
    userslist.append(user)