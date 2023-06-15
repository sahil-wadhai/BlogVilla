from typing import Annotated
from fastapi import Depends, HTTPException, status
from datetime import datetime, timedelta

from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer

from .schemas import TokenData,db,UserResponse

from dotenv import load_dotenv
import os
load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_access_token(data: dict):
     
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    jwt_token = jwt.encode(to_encode, key=SECRET_KEY, algorithm=ALGORITHM)
    return jwt_token

    
async def get_current_user(token: Annotated[str , Depends(oauth2_scheme)] ):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not verify token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, key = SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("id")

        if id is None:
            raise credentials_exception
        
        current_user_id = id
        user = await db["users"].find_one({"_id":current_user_id})
        return user
    
    except JWTError:
        raise credentials_exception
    
    
    
