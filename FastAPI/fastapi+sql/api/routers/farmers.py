# routes/farmers.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schemas
from database import SessionLocal


#  Farmers module ke liye router
# prefix="/farmers" ka matlab hai ki sab endpoints "/farmers/..." se start honge
# tags=["Farmers"] ka matlab hai FastAPI docs me "Farmers" section me dikhega
router = APIRouter(prefix="/farmers", tags=["Farmers"])


# -------------------- DATABASE DEPENDENCY --------------------
def get_db():
    """
     Har request ke liye naya database session create karo
    aur kaam khatam hone par close karo
    """
    db = SessionLocal()
    try: yield db
    finally: db.close()



# -------------------- CREATE NEW FARMER --------------------
@router.post("/", response_model=schemas.Farmer)
def create_new_farmer(farmer: schemas.FarmerCreate, db: Session = Depends(get_db)):
    """
    API Endpoint: POST /farmers/
    - Naya farmer create karta hai
    - Input: FarmerCreate schema (email, name, farm_area, password)
    - Output: Farmer schema (id + input data)
    """
    # Pehle check karo ki email already registered hai ya nahi
    db_farmer = crud.get_farmer_by_email(db, email=farmer.email)
    if db_farmer:
        raise HTTPException(status_code=400, detail="Email already registered")
    # Agar email available hai to naya farmer create karo
    return crud.create_farmer(db=db, farmer=farmer)


# -------------------- READ ALL FARMERS --------------------
@router.get("/", response_model=List[schemas.Farmer])
def read_all_farmers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    API Endpoint: GET /farmers/
    - Sabhi farmers ke data ko list karta hai
    - Query params: skip, limit
    - Output: List of Farmer schema
    """
    return crud.get_farmers(db, skip=skip, limit=limit)