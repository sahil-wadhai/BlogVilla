from fastapi import APIRouter, HTTPException, status, File, UploadFile , Depends
from fastapi.encoders import jsonable_encoder

from PIL import Image

from ..oath2 import get_current_user
from ..schemas import db, User, UserResponse , ImageUrl
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

@router.post("/uploadimage/",response_description="upload profile picture",response_model=ImageUrl)
async def create_upload_file(file: UploadFile | None = None , user = Depends(get_current_user)):
    if not file:
        return {"message": "No upload file sent"}
    
    FilePath = "./static/images/"
    filename = file.filename
    extension = filename.split(".")[1]
    if extension not in ["jpg","png","webp"]:
        return {"status":"error","details":"image extension not allowed"}
    
    #ex: u3qq5262h1.jpg
    token_name = secrets.token_hex(10)+"."+extension

    #ex: /static/images/u3qq5262h1.jpg
    generated_url = FilePath + token_name

    file_content = await file.read()
    with open(generated_url,"wb") as file:
        file.write(file_content)

    #Pillow to scale images
    img = Image.open(generated_url)
    img = img.resize(size=(200,200))
    img.save(generated_url)

    file.close()

    return {"imageUrl": generated_url}