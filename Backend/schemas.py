from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Literal
from datetime import date

# --- Base Schemas (API input ke liye data ka structure) ---
class CropBase(BaseModel):
    name: str
    season: Optional[str] = None
    duration_days: Optional[int] = None

class FarmerBase(BaseModel):
    email: EmailStr 
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


# -------------------- NEW: AUTHENTICATION SCHEMAS --------------------

# Input schema for the login endpoint
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Schema for the user object returned *inside* the login response
class UserOut(BaseModel):
    id: int
    name: Optional[str] = None
    email: EmailStr
    role: Optional[Literal["farmer", "expert", "admin"]] = None # Assuming you have a role field
    
    class Config:
        from_attributes = True

# Schema for the complete token response (used internally if needed, but not directly by the login endpoint)
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    
# Schema for token data payload (used internally by security module)
class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None


# -------------------- NEW: CROP RECORDS DASHBOARD SCHEMAS --------------------
# These must match the types defined in the frontend's lib/api.ts

UserTrend = Literal["up", "down", "stable"]

# Sub-schema 1: New Production Data (Yield analysis)
class NewProductionRecord(BaseModel):
    crop: str
    location: str
    # 'yield' key ko match karne ke liye alias use kiya gaya hai
    yield_: str = Field(..., alias="yield") 
    growth: str
    status: str
    farmer: str
    technology: str
    investment: str
    roi: str
    icon: str
    trend: UserTrend

# Sub-schema 2: Historical Summary
class HistoricalRecord(BaseModel):
    year: str
    totalProduction: str
    productivity: str
    cropped: str
    highlights: List[str]

# Sub-schema 3: Crop Performance
class CropPerformanceRecord(BaseModel):
    crop: str
    current: str
    target: str
    performance: int
    trend: UserTrend

# Final schema for GET /api/crop-records
class CropRecordsData(BaseModel):
    newProductionData: List[NewProductionRecord]
    historicalData: List[HistoricalRecord]
    cropPerformance: List[CropPerformanceRecord]


# -------------------- Create Schemas --------------------
class CropCreate(CropBase): pass
class FarmerCreate(FarmerBase): 
    # Password field is required for creation
    password: str 
    # You might want to include the user's role here for creation
    role: Optional[Literal["farmer", "expert", "admin"]] = "farmer" 

class SchemeCreate(SchemeBase): pass
class ExpertCreate(ExpertBase): pass
class CropProductionCreate(CropProductionBase): pass

# --- Response Schemas (API output ke liye, ismein IDs bhi hoti hain) ---
class Crop(CropBase):
    id: int
    class Config: from_attributes = True 

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

# User registration response (same as UserOut, but including role ensures clarity)
class UserRegister(FarmerCreate):
    # This inherits FarmerCreate but often requires specific validation for password/email
    pass







# from pydantic import BaseModel, EmailStr
# from typing import List, Optional
# from datetime import date

# # --- Base Schemas (API input ke liye data ka structure) ---
# class CropBase(BaseModel):
#     name: str
#     season: Optional[str] = None
#     duration_days: Optional[int] = None

# class FarmerBase(BaseModel):
#     email: EmailStr  # Email validation ke liye
#     name: Optional[str] = None
#     farm_area: Optional[float] = None

# class SchemeBase(BaseModel):
#     name: str
#     description: Optional[str] = None
#     eligibility: Optional[str] = None
#     benefits: Optional[str] = None
#     start_date: Optional[date] = None
#     status: str = "Active"
#     state: str 

# class ExpertBase(BaseModel):
#     name: str
#     specialization: str
#     contact: Optional[str] = None
#     location: Optional[str] = None

# class CropProductionBase(BaseModel):
#     region: str
#     season: str
#     year: int
#     area_hectare: Optional[float] = None
#     production_tonnes: Optional[float] = None
#     demand_tonnes: Optional[float] = None
#     surplus_deficit: Optional[float] = None

# # --- Create Schemas (Naye records banane ke liye) ---
# class CropCreate(CropBase): pass
# class FarmerCreate(FarmerBase): password: str
# class SchemeCreate(SchemeBase): pass
# class ExpertCreate(ExpertBase): pass
# class CropProductionCreate(CropProductionBase): pass

# # --- Response Schemas (API output ke liye, ismein IDs bhi hoti hain) ---
# class Crop(CropBase):
#     id: int
#     class Config: from_attributes = True # SQLAlchemy models se Pydantic models ko map karne ke liye

# class CropProduction(CropProductionBase):
#     id: int
#     crop_id: int
#     class Config: from_attributes = True

# class CropWithProduction(Crop):
#     production_data: List[CropProduction] = []

# class Farmer(FarmerBase):
#     id: int
#     crops: List[Crop] = []
#     class Config: from_attributes = True

# class Scheme(SchemeBase):
#     id: int
#     class Config: from_attributes = True

# class Expert(ExpertBase):
#     id: int
#     class Config: from_attributes = True