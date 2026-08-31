from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date

# --- Base Schemas (API input ke liye data ka structure) ---
class CropBase(BaseModel):
    name: str
    season: Optional[str] = None
    duration_days: Optional[int] = None

class FarmerBase(BaseModel):
    email: EmailStr  # Email validation ke liye
    name: Optional[str] = None
    farm_area: Optional[float] = None

class SchemeBase(BaseModel):
    name: str
    description: Optional[str] = None
    eligibility: Optional[str] = None
    benefits: Optional[str] = None
    start_date: Optional[date] = None
    status: str = "Active"
    state: str 

class ExpertBase(BaseModel):
    name: str
    specialization: str
    contact: Optional[str] = None
    location: Optional[str] = None

class CropProductionBase(BaseModel):
    region: str
    season: str
    year: int
    area_hectare: Optional[float] = None
    production_tonnes: Optional[float] = None
    demand_tonnes: Optional[float] = None
    surplus_deficit: Optional[float] = None

# --- Create Schemas (Naye records banane ke liye) ---
class CropCreate(CropBase): pass
class FarmerCreate(FarmerBase): password: str
class SchemeCreate(SchemeBase): pass
class ExpertCreate(ExpertBase): pass
class CropProductionCreate(CropProductionBase): pass

# --- Response Schemas (API output ke liye, ismein IDs bhi hoti hain) ---
class Crop(CropBase):
    id: int
    class Config: from_attributes = True # SQLAlchemy models se Pydantic models ko map karne ke liye

class CropProduction(CropProductionBase):
    id: int
    crop_id: int
    class Config: from_attributes = True

class CropWithProduction(Crop):
    production_data: List[CropProduction] = []

class Farmer(FarmerBase):
    id: int
    crops: List[Crop] = []
    class Config: from_attributes = True

class Scheme(SchemeBase):
    id: int
    class Config: from_attributes = True

class Expert(ExpertBase):
    id: int
    class Config: from_attributes = True