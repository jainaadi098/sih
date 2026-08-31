# routes/crops.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schemas
from database import SessionLocal


# 🔹 Crop module ke liye router
# prefix="/crops" ka matlab hai ki sab endpoints "/crops/..." se start honge
# tags=["Crops"] ka matlab hai FastAPI docs me "Crops" section me dikhai dega
router = APIRouter(prefix="/crops", tags=["Crops"])


# -------------------- DATABASE DEPENDENCY --------------------
def get_db():
    """
    🔹 Har request ke liye naya database session create karo
    aur kaam khatam hone par close karo
    """
    db = SessionLocal()
    try: yield db
    finally: db.close()


# -------------------- CREATE NEW CROP --------------------
@router.post("/", response_model=schemas.Crop)
def create_new_crop(crop: schemas.CropCreate, db: Session = Depends(get_db)):
    """
    📝 API Endpoint: POST /crops/
    - Naya crop create karta hai
    - Input: CropCreate schema (name, season, duration_days)
    - Output: Crop schema (id + input data)
    """
    return crud.create_crop(db=db, crop=crop)


# -------------------- READ ALL CROPS --------------------
@router.get("/", response_model=List[schemas.CropWithProduction])
def read_all_crops(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    📝 API Endpoint: GET /crops/
    - Sabhi crops ke data ko list karta hai
    - Output me Crop + uske production data (CropWithProduction schema)
    - Query params: skip, limit
    """
    return crud.get_crops(db, skip=skip, limit=limit)


# -------------------- READ SINGLE CROP --------------------
@router.get("/{crop_id}", response_model=schemas.CropWithProduction)
def read_crop(crop_id: int, db: Session = Depends(get_db)):
    """
    📝 API Endpoint: GET /crops/{crop_id}
    - Crop ID ke basis pe single crop ka data fetch karta hai
    - Agar crop nahi mila to 404 error
    """
    db_crop = crud.get_crop(db, crop_id=crop_id)
    if db_crop is None:
        raise HTTPException(status_code=404, detail="Crop not found")
    return db_crop