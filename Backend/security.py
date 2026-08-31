# security.py (Assuming this is the correct filename for security functions)

import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

# Import the database functions we need for user lookup
from sqlalchemy.orm import Session
from database import get_db # Assuming get_db is available from your database module
import crud, models # Assuming you need to fetch the full user object later

load_dotenv()

# --- Configuration from Environment Variables ---
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

# --- Security Setup ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# NOTE: tokenUrl should point to your active login path, which is now prefixed by /api
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login/farmer") 

def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str):
    return pwd_context.verify(password, hashed)

# --- Token Creation ---
def create_access_token(data: dict):
    """
    Creates a JWT token. data dict should contain 'sub' (email) and 'role'.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# --- Token Validation and User Retrieval (Updated) ---
def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Decodes the token, validates credentials, and returns user details (email and role).
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # 1. Retrieve email ('sub')
        email: str = payload.get("sub")
        # 2. Retrieve role (NEW: Added to the payload in auth.py's login function)
        role: str = payload.get("role") 
        
        if email is None or role is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
        
    # Return both email and role, which is used by protected endpoints like /api/farmers/me
    return {"email": email, "role": role}




# # auth.py

# import os
# from datetime import datetime, timedelta
# from dotenv import load_dotenv
# from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import JWTError, jwt
# from passlib.context import CryptContext

# load_dotenv()

# SECRET_KEY = os.getenv("SECRET_KEY")
# ALGORITHM = os.getenv("ALGORITHM")
# ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# def get_password_hash(password: str):
#     return pwd_context.hash(password)

# def verify_password(password: str, hashed: str):
#     return pwd_context.verify(password, hashed)

# def create_access_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         email: str = payload.get("sub")
#         if email is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception
#     return {"email": email}