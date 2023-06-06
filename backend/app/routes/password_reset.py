from fastapi import APIRouter , HTTPException , status
from ..schemas import PasswordReset,db
from ..oath2 import create_access_token

router = APIRouter(
    prefix="/password",
    tags=["password reset"],
    #dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

@router.put("",response_description="password reset")
async def password_reset(email:PasswordReset):
    user = await db["users"].find_one({"email":email})

    if user:
        token = create_access_token({"id":user["_id"]})
        reset_link = f"http://127.0.0.1:8000/reset?token={token}"
        return {"reset_link":reset_link}
        #send reset link via email
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="user not found")