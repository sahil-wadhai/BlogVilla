from fastapi import APIRouter , HTTPException , status
from ..schemas import db,User,UserResponse
from fastapi.encoders import jsonable_encoder
from ..utils import get_password_hash
import secrets

router = APIRouter(
    prefix="/users",
    tags=["users"],
    #dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

@router.post("/register" , response_description="Register a User",response_model=UserResponse)
async def register_user( user:User ):
    user = jsonable_encoder(user)

    user_found = await db["users"].find_one( {"username": user["username"]} )
    email_found = await db["users"].find_one( {"email": user["email"]} )

    #check if user already exists
    if user_found:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT , detail="username is already taken ")
    
    if email_found:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT , detail="email already exists")
    
    #hash user password
    user["password"] = get_password_hash(user["password"] )

    #create api_key
    user["apiKey"] = secrets.token_hex(30)

    new_user = await db["users"].insert_one(user)
    created_user = await db["users"].find_one({"_id": new_user.inserted_id})

    return created_user
