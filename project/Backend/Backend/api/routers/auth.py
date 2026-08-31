# routes/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import crud, models, schemas, security
from database import get_db


# Ye router "auth" module ke liye banaya gaya hai
# prefix="/auth" ka matlab hai ki sabhi endpoints "/auth/..." se start honge
# tags=["Auth"] ka matlab hai ki FastAPI docs (/docs) me ye "Auth" section me dikhai dega
router = APIRouter(prefix="/auth", tags=["Auth"])


# -------------------- REGISTER API --------------------
@router.post("/register/", response_model=schemas.UserOut)
def register(user: schemas.UserRegister, db: Session = Depends(get_db)):
    """
    API Endpoint: POST /auth/register/
    - Naya user register karne ke liye
    - Input: email, password, etc. (schemas.UserRegister ke through)
    - Output: user details (schemas.UserOut ke format me)
    """
    # Pehle check karo ki email already registered hai ya nahi
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        # Agar email mil gaya to error bhej do
        raise HTTPException(status_code=400, detail="Email already registered")
    # Nahi to naya user banado
    return crud.create_user(db=db, user_data=user)



# -------------------- LOGIN API --------------------
@router.post("/login/", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    """
    📝 API Endpoint: POST /auth/login/
    - User login ke liye
    - Input: email + password
    - Output: JWT access token
    """
    # Step 1: Database me check karo ki user exist karta hai ya nahi
    db_user = crud.get_user_by_email(db, email=user.email)
    # Step 2: Agar user nahi mila ya password galat hai to error bhejo
    if not db_user or not security.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    # Step 3: Agar sab sahi hai to JWT access token generate karo
    access_token = security.create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}# auth.py

# !!! iske niche api nhi h

import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

# This function loads variables from your .env file
load_dotenv()

# --- Main Configuration ---
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
# The corrected line with a default value to prevent crashes
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

# --- Security Setup ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# --- Utility Functions ---
def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str):
    return pwd_context.verify(password, hashed)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # In a real app, you would use this email to query your database
    # and return the full user object.
    return {"email": email}