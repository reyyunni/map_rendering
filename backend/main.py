from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import update_coordinates, get_polygons, insert_db
from models import Polygon
from contextlib import asynccontextmanager
import json 



@asynccontextmanager
async def lifespan(app: FastAPI):
    insert_db()
    yield

app = FastAPI(lifespan=lifespan)


origins = [
    "*",
    "http://localhost:8080",
    "localhost:8080",
    "127.0.0.1:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.get('/')
def root():
    data = get_polygons()
    res = json.dumps(data)
    return res

@app.post('/drag')
def new_coordinates(coords: Polygon):
    update_coordinates(coords)
     


