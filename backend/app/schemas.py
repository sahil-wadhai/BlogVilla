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
    firstname: str = Field(...)
    lastname: str = Field(...)
    username: str = Field(...)
    email: EmailStr
    age: int= Field(...)
    about: str = Field(...)
    password: str = Field(...)

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
    firstname: str = Field(...)
    lastname: str = Field(...)
    username: str = Field(...)
    email: EmailStr
    age: int= Field(...)
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
    id: str | None = None

class PasswordReset(BaseModel):
    email:EmailStr