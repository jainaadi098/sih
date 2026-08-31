# routes/schemes.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List ,Optional
import crud, schemas
from database import SessionLocal


#  Schemes module ke liye router
# prefix="/schemes" ka matlab hai ki sab endpoints "/schemes/..." se start honge
# tags=["Schemes"] ka matlab hai FastAPI docs me "Schemes" section me dikhega
router = APIRouter(prefix="/schemes", tags=["Schemes"])


# -------------------- DATABASE DEPENDENCY --------------------
def get_db():
    """
     Har request ke liye naya database session create karo
    aur kaam khatam hone par close karo
    """
    db = SessionLocal()
    try: yield db
    finally: db.close()


# -------------------- CREATE NEW SCHEME --------------------
@router.post("/", response_model=schemas.Scheme)
def create_new_scheme(scheme: schemas.SchemeCreate, db: Session = Depends(get_db)):
    """
    API Endpoint: POST /schemes/
    - Nayi government scheme create karta hai
    - Input: SchemeCreate schema (name, description, eligibility, benefits, start_date, status, state)
    - Output: Scheme schema (id + input data)
    """
    return crud.create_scheme(db=db, scheme=scheme)


# -------------------- READ ALL SCHEMES --------------------
@router.get("/", response_model=List[schemas.Scheme])
def read_all_schemes(skip: int = 0, limit: int = 100,state: Optional[str] = None, db: Session = Depends(get_db)):
    """
    API Endpoint: GET /schemes/
    - Sabhi schemes ko list karta hai
    - Optional query param: state (specific state ke schemes ke liye)
    - Query params: skip, limit
    - Output: List of Scheme schema
    """
    return crud.get_schemes(db, skip=skip, limit=limit)