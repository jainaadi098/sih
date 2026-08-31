# routes/experts.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import crud, schemas
from database import SessionLocal



router = APIRouter(prefix="/experts", tags=["Experts"])


# -------------------- DATABASE DEPENDENCY --------------------
def get_db():
    """
    🔹 Har request ke liye naya database session create karo
    aur kaam khatam hone par close karo
    """
    db = SessionLocal()
    try: yield db
    finally: db.close()



# -------------------- CREATE NEW EXPERT --------------------
@router.post("/", response_model=schemas.Expert)
def create_new_expert(expert: schemas.ExpertCreate, db: Session = Depends(get_db)):
    """
    📝 API Endpoint: POST /experts/
    - Naya expert create karta hai
    - Input: ExpertCreate schema (name, specialization, contact, location)
    - Output: Expert schema (id + input data)
    """
    return crud.create_expert(db=db, expert=expert)


# -------------------- READ ALL EXPERTS --------------------
@router.get("/", response_model=List[schemas.Expert])
def read_all_experts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    📝 API Endpoint: GET /experts/
    - Sabhi experts ke data ko list karta hai
    - Query params: skip, limit
    - Output: List of Expert schema
    """
    return crud.get_experts(db, skip=skip, limit=limit)