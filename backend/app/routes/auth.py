from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import  OAuth2PasswordRequestForm
from ..schemas import db
from .. import utils
from ..oath2 import create_access_token

router = APIRouter(
    prefix="/login",
    tags=["authentication"],
)

@router.post("",status_code=status.HTTP_200_OK)
async def login(form_data:OAuth2PasswordRequestForm = Depends( )):

    user = await db["users"].find_one({"username":form_data.username})

    if user and utils.verify_password(form_data.password, user["password"]):
        access_token=create_access_token( {"id":user["_id"]} )
        return {"access_token":access_token ,"token_type":"Bearer"}
    
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    