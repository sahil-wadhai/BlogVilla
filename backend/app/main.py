from typing import Union

from fastapi import FastAPI
from .routes import users

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(users.router)