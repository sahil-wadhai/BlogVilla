from typing import Union

from fastapi import FastAPI
from .routes import users,auth,blogs
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static",StaticFiles(directory="static"),name="static")

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"api": "blogVilla"}


app.include_router(users.router)
app.include_router(auth.router)
app.include_router(blogs.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
