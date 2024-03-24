from typing import Optional

import motor.motor_asyncio
from dotenv import load_dotenv
from bson import ObjectId
import os
from pydantic import BaseModel,Field,EmailStr


load_dotenv('.env')

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URL"))

db = client.blog_villa

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class User(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    firstname: str = Field(...,min_length=2,max_length=15)
    lastname: str = Field(...,min_length=2,max_length=15)
    username: str = Field(...,min_length=2,max_length=15)
    email: EmailStr
    imageUrl : Optional[str]
    age: int= Field(...,gt=5)
    about: str = Field(...)
    password: str = Field(...,min_length=5,max_length=15)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "firstname": "Jane",
                "lastname": "Doee",
                "username": "Doe123",
                "email": "jdoe@example.com",
                "age": 22,
                "about": "Full Stack developer",
                "password":"secret-code"
            }
        }

class UserResponse(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    firstname: str = Field(...,min_length=2,max_length=15)
    lastname: str = Field(...,min_length=2,max_length=15)
    username: str = Field(...,min_length=2,max_length=15)
    email: EmailStr
    imageUrl : Optional[str]
    age: int= Field(...,gt=5)
    about: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "firstname": "Jane",
                "lastname": "Doe",
                "username": "Doe123",
                "email": "jdoe@example.com",
                "age": 22,
                "about": "Full Stack developer"         
            }
        }

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id:str

class PasswordReset(BaseModel):
    email:EmailStr

class Blog(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str = Field(...)
    description: str = Field(...)
    content: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "title": "Api Development",
                "description": "its about fastapi",
                "content": "fastapi do that and do that"
            }
        }

class BlogResponse(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str = Field(...)
    description: str = Field(...)
    content: str = Field(...)
    created_at : str = Field(...)
    author_id : str = Field(...)
    author_name : str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "Blog Response": {
                "_id":"121212m12m",
                "title": "Api Development",
                "description": "its about fastapi",
                "content": "fastapi do that and do that",
                "created_at":"01/01/2023",
                "author_id": "author1234",
                "author_name": "john doe"
            }
        }

class ImageUrl(BaseModel):
    imageUrl:str