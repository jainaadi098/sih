# api/routers/crop_production.py

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Literal, Optional
from pydantic import BaseModel, Field # Pydantic structures ke liye
import crud, schemas 
from database import SessionLocal

# Router prefix yahan se hata diya gaya hai, ab yeh /api/ se chalega
router = APIRouter(tags=["Crop Production"])


# --- DATABASE DEPENDENCY (Unchanged) ---
def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()


# --- RESPONSE SCHEMAS (Frontend ke anusaar) ---
# NOTE: Inhe ideally aapko schemas.py me define karna chahiye
UserTrend = Literal["up", "down", "stable"]

class NewProductionRecord(BaseModel):
    crop: str
    location: str
    # 'yield' Python keyword hai, isliye hum Field(alias="yield") use karte hain
    yield_: str = Field(..., alias="yield") 
    growth: str
    status: str
    farmer: str
    technology: str
    investment: str
    roi: str
    icon: str
    trend: UserTrend

class HistoricalRecord(BaseModel):
    year: str
    totalProduction: str
    productivity: str
    cropped: str
    highlights: List[str]

class CropPerformanceRecord(BaseModel):
    crop: str
    current: str
    target: str
    performance: int
    trend: UserTrend

# Ye final structure hai jo frontend expects karta hai
class CropRecordsData(BaseModel):
    newProductionData: List[NewProductionRecord]
    historicalData: List[HistoricalRecord]
    cropPerformance: List[CropPerformanceRecord]


# -------------------- FETCH CROP RECORDS API (NEW ENDPOINT) --------------------
# Handles GET /api/crop-records?year=...&state=...
@router.get("/crop-records", response_model=CropRecordsData)
def fetch_crop_records(
    # Query parameters accept karna
    year: str = Query("2024", description="Filter by production year"), 
    state: str = Query("all", description="Filter by Indian State"),
    db: Session = Depends(get_db)
):
    """
    📝 API Endpoint: GET /api/crop-records
    - Dashboard data fetch karta hai jo year aur state se filtered ho.
    """
    
    # NOTE: Is jagah par aapko crud.get_filtered_crop_records(db, year=year, state=state) 
    # function call karna hai jo database se data layega.
    
    # --- MOCK DATA FOR PROTOTYPE ---
    return {
        "newProductionData": [
            {"crop": "Indo-Israel Avocado", "location": "Maharashtra", "yield": "45 tons/hectare", "growth": "+230%", "status": "Success Story", "farmer": "Ramesh Kumar", "technology": "Drip irrigation + Precision farming", "investment": "₹12 lakhs/hectare", "roi": "340% in 3 years", "icon": "🥑", "trend": "up"},
            {"crop": "Dragon Fruit", "location": "Gujarat", "yield": "35 tons/hectare", "growth": "+180%", "status": "Expanding", "farmer": "Priya Patel", "technology": "Greenhouse cultivation", "investment": "₹8 lakhs/hectare", "roi": "250% in 2 years", "icon": "🐲", "trend": "up"},
        ],
        "historicalData": [
            {"year": "2023", "totalProduction": "332.79 MT", "productivity": "2,574 kg/hectare", "cropped": "195.4 Mha", "highlights": ["Record wheat production of 112.9 MT", "Pulses production increased by 8.5%"]},
        ],
        "cropPerformance": [
            {"crop": "Rice", "current": "129.5 MT", "target": "135 MT", "performance": 96, "trend": "stable"},
            {"crop": "Wheat", "current": "112.9 MT", "target": "115 MT", "performance": 98, "trend": "up"}
        ]
    }


# -------------------- EXISTING ENDPOINTS --------------------
# Existing endpoints ka path ab /api/crops/{crop_id} aur /api/production-data/ ho gaya hai
@router.post("/crops/{crop_id}", response_model=schemas.CropProduction)
def create_production_data_for_crop(
    crop_id: int, item: schemas.CropProductionCreate, db: Session = Depends(get_db)
):
    """API Endpoint: POST /api/crops/{crop_id}"""
    db_crop = crud.get_crop(db, crop_id=crop_id)
    if not db_crop:
        raise HTTPException(status_code=404, detail="Crop not found")
    return crud.create_crop_production(db=db, item=item, crop_id=crop_id)

@router.get("/production-data/", response_model=List[schemas.CropProduction])
def read_all_production_data(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """API Endpoint: GET /api/production-data/"""
    return crud.get_crop_productions(db, skip=skip, limit=limit)







# # routes/crop_production.py
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List
# import crud, schemas
# from database import SessionLocal


# # 🔹 Ye router "Crop Production" module ke liye banaya gaya hai
# # prefix="/production-data" ka matlab hai ki sabhi endpoints "/production-data/..." se start honge
# # tags=["Crop Production"] ka matlab hai ki FastAPI docs (/docs) me ye section me dikhega
# router = APIRouter(prefix="/production-data", tags=["Crop Production"])


# # -------------------- DATABASE DEPENDENCY --------------------
# def get_db():
#     """
#     🔹 Ye function FastAPI ko batata hai ki har request ke liye
#     ek naya database session open karo aur kaam khatam hone par close karo.
#     """
#     db = SessionLocal()
#     try: yield db
#     finally: db.close()


# # -------------------- CREATE Crop Production API --------------------
# @router.post("/crops/{crop_id}", response_model=schemas.CropProduction)
# def create_production_data_for_crop(
#     crop_id: int, item: schemas.CropProductionCreate, db: Session = Depends(get_db)
# ):
#     """
#     📝 API Endpoint: POST /production-data/crops/{crop_id}
#     - Crop ke liye production data create karta hai
#     - Input: CropProductionCreate schema
#     - Output: CropProduction schema
#     """
#     # Check karo ki crop exist karta hai ya nahi
#     db_crop = crud.get_crop(db, crop_id=crop_id)
#     if not db_crop:
#         # Agar crop nahi mila to 404 error bhejo
#         raise HTTPException(status_code=404, detail="Crop not found")
#     # Agar crop mila to CRUD function call karke production data create karo
#     return crud.create_crop_production(db=db, item=item, crop_id=crop_id)


# # -------------------- READ ALL Production Data API --------------------
# @router.get("/", response_model=List[schemas.CropProduction])
# def read_all_production_data(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     """
#     📝 API Endpoint: GET /production-data/
#     - Sabhi crop production data ko list karta hai
#     - Query params: skip (offset), limit (number of records)
#     - Output: List of CropProduction schema
#     """
#     return crud.get_crop_productions(db, skip=skip, limit=limit)