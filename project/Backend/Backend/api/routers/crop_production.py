# routes/crop_production.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schemas
from database import SessionLocal


# 🔹 Ye router "Crop Production" module ke liye banaya gaya hai
# prefix="/production-data" ka matlab hai ki sabhi endpoints "/production-data/..." se start honge
# tags=["Crop Production"] ka matlab hai ki FastAPI docs (/docs) me ye section me dikhega
router = APIRouter(prefix="/production-data", tags=["Crop Production"])


# -------------------- DATABASE DEPENDENCY --------------------
def get_db():
    """
    🔹 Ye function FastAPI ko batata hai ki har request ke liye
    ek naya database session open karo aur kaam khatam hone par close karo.
    """
    db = SessionLocal()
    try: yield db
    finally: db.close()


# -------------------- CREATE Crop Production API --------------------
@router.post("/crops/{crop_id}", response_model=schemas.CropProduction)
def create_production_data_for_crop(
    crop_id: int, item: schemas.CropProductionCreate, db: Session = Depends(get_db)
):
    """
    📝 API Endpoint: POST /production-data/crops/{crop_id}
    - Crop ke liye production data create karta hai
    - Input: CropProductionCreate schema
    - Output: CropProduction schema
    """
    # Check karo ki crop exist karta hai ya nahi
    db_crop = crud.get_crop(db, crop_id=crop_id)
    if not db_crop:
        # Agar crop nahi mila to 404 error bhejo
        raise HTTPException(status_code=404, detail="Crop not found")
    # Agar crop mila to CRUD function call karke production data create karo
    return crud.create_crop_production(db=db, item=item, crop_id=crop_id)


# -------------------- READ ALL Production Data API --------------------
@router.get("/", response_model=List[schemas.CropProduction])
def read_all_production_data(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    📝 API Endpoint: GET /production-data/
    - Sabhi crop production data ko list karta hai
    - Query params: skip (offset), limit (number of records)
    - Output: List of CropProduction schema
    """
    return crud.get_crop_productions(db, skip=skip, limit=limit)