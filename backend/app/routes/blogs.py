from fastapi import APIRouter , HTTPException , status , Depends
from ..schemas import db,User,UserResponse,Blog,BlogResponse
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from ..utils import get_password_hash
import secrets
from ..oath2 import get_current_user
from datetime import date

router = APIRouter(
    prefix="/blogs",
    tags=["blogs"],
    #dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

@router.post("/create" , response_description="Create a Blog",response_model=BlogResponse)
async def create_blog( blog:Blog, current_user=Depends(get_current_user) ):
  try:
    # print(current_user)
    blog = jsonable_encoder(blog)
    blog["created_at"] = str(date.today())
    blog["author_id"] = current_user["_id"]
    blog["author_name"] = str(current_user["firstname"]) + " " + str(current_user["lastname"])

    new_blog = await db["blogs"].insert_one(blog)
    created_blog = await db["blogs"].find_one({"_id": new_blog.inserted_id})
    return created_blog
  
  except:
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")

@router.get("" , response_description="List Blogs",response_model=list[BlogResponse])
async def get_blogs( limit:int = 10 , order_by:str = "created_at"):
  try:
    blogs = await db["blogs"].find({ "$query":{}, "$orderby":{order_by:-1} }).to_list(limit)
    return blogs
  
  except:
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
  

@router.get("/{id}" , response_description="Single blog",response_model=BlogResponse)
async def get_blog(id:str):
  try:
    blog = await db["blogs"].find_one({"_id":id})
    if blog is None:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Blog with this id not found")
    return blog
  
  except:
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
  
@router.delete("/{id}" , response_description="Delete a blog")
async def get_blog(id:str,current_user=Depends(get_current_user) ):
  try:
    blog = await db["blogs"].find_one({"_id":id})
    if blog is None:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Blog with this id not found")
    
    if current_user["_id"] == blog["author_id"]:
      res = await db["blogs"].delete_one({"_id":id})
      return {"status":"Blog deleted"}
    else:
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="unauthorized access")
  
  except:
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")