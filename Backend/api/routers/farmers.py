# api/routers/farmers.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import crud, schemas
from database import SessionLocal
import security # 1. Import security module for get_current_user dependency


# Router prefix is /farmers to result in final path /api/farmers/...
router = APIRouter(prefix="/farmers", tags=["Farmers"])


# --- DATABASE DEPENDENCY (Unchanged) ---
def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()


# -------------------- READ CURRENT FARMER'S PROFILE (NEW PROTECTED ENDPOINT) --------------------
# Handles GET /api/farmers/me
@router.get("/me", response_model=schemas.Farmer)
def read_farmer_me(
    # 2. Authentication Dependency: Requires a valid JWT token in the header
    current_user: dict = Depends(security.get_current_user), 
    db: Session = Depends(get_db)
):
    """
    📝 API Endpoint: GET /api/farmers/me
    - Logged-in farmer ka profile data fetch karta hai.
    - Requires Authorization: Bearer <token>
    """
    # 3. Email ko verified token data se nikalna
    farmer_email = current_user.get("sub") 
    if not farmer_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve user email from token")

    # 4. Database se farmer ka full data fetch karna
    db_farmer = crud.get_farmer_by_email(db, email=farmer_email)
    
    if not db_farmer:
        raise HTTPException(status_code=404, detail="Farmer not found in database")
        
    return db_farmer


# -------------------- CREATE NEW FARMER (Unchanged) --------------------
@router.post("/", response_model=schemas.Farmer)
def create_new_farmer(farmer: schemas.FarmerCreate, db: Session = Depends(get_db)):
    """API Endpoint: POST /api/farmers/"""
    db_farmer = crud.get_farmer_by_email(db, email=farmer.email)
    if db_farmer:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_farmer(db=db, farmer=farmer)


# -------------------- READ ALL FARMERS (Unchanged) --------------------
@router.get("/", response_model=List[schemas.Farmer])
def read_all_farmers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """API Endpoint: GET /api/farmers/"""
    return crud.get_farmers(db, skip=skip, limit=limit)










# # routes/farmers.py
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List
# import crud, schemas
# from database import SessionLocal


# # 🔹 Farmers module ke liye router
# # prefix="/farmers" ka matlab hai ki sab endpoints "/farmers/..." se start honge
# # tags=["Farmers"] ka matlab hai FastAPI docs me "Farmers" section me dikhega
# router = APIRouter(prefix="/farmers", tags=["Farmers"])


# # -------------------- DATABASE DEPENDENCY --------------------
# def get_db():
#     """
#     🔹 Har request ke liye naya database session create karo
#     aur kaam khatam hone par close karo
#     """
#     db = SessionLocal()
#     try: yield db
#     finally: db.close()



# # -------------------- CREATE NEW FARMER --------------------
# @router.post("/", response_model=schemas.Farmer)
# def create_new_farmer(farmer: schemas.FarmerCreate, db: Session = Depends(get_db)):
#     """
#     📝 API Endpoint: POST /farmers/
#     - Naya farmer create karta hai
#     - Input: FarmerCreate schema (email, name, farm_area, password)
#     - Output: Farmer schema (id + input data)
#     """
#     # Pehle check karo ki email already registered hai ya nahi
#     db_farmer = crud.get_farmer_by_email(db, email=farmer.email)
#     if db_farmer:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     # Agar email available hai to naya farmer create karo
#     return crud.create_farmer(db=db, farmer=farmer)


# # -------------------- READ ALL FARMERS --------------------
# @router.get("/", response_model=List[schemas.Farmer])
# def read_all_farmers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     """
#     📝 API Endpoint: GET /farmers/
#     - Sabhi farmers ke data ko list karta hai
#     - Query params: skip, limit
#     - Output: List of Farmer schema
#     """
#     return crud.get_farmers(db, skip=skip, limit=limit)