from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import Optional, List
import models, schemas
from datetime import date # Import date if used in models/schemas

# Password hashing ke liye setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -------------------- NEW: AUTHENTICATION / USER CRUD --------------------

# Ye generic function farmer aur expert dono ke liye use hogi login me
def get_user_by_email(db: Session, email: str):
    """
    Fetches a user (farmer or expert) by email for authentication.
    NOTE: Assuming all users (farmers/experts) are stored in models.Farmer 
    and it includes the 'hashed_password' field. If experts are separate, 
    you'd need to check models.Expert too.
    """
    # For a simple prototype, we assume the login user is a Farmer model
    db_user = db.query(models.Farmer).filter(models.Farmer.email == email).first()
    
    # If you have an Experts table, uncomment and adapt this:
    # if not db_user:
    #     db_user = db.query(models.Expert).filter(models.Expert.email == email).first()
        
    return db_user

# -------------------- NEW: FILTERED CROP RECORDS CRUD --------------------

def get_filtered_crop_records(db: Session, year: str, state: str):
    """
    Fetches the complex dashboard data filtered by year and state.
    
    NOTE: This is the MOST complex database function. For a prototype, 
    we will return a mock structure. In a real application, you would:
    1. Perform multiple complex joins (e.g., join CropProduction, Farmer, and Crop).
    2. Filter the query by the 'year' and 'state' parameters.
    3. Aggregate the data into the final 'CropRecordsData' structure (List[NewProductionRecord], etc.).
    """
    
    # --- MOCK IMPLEMENTATION (Replace with real SQLAlchemy queries) ---
    print(f"DEBUG: Filtering crop records for Year={year}, State={state}")
    
    # This structure MUST match the schemas.CropRecordsData Pydantic model
    return {
        "newProductionData": [
            {"crop": f"Filtered Crop {year}", "location": state, "yield": "50 tons/hectare", "growth": "+20%", "status": "Filtered", "farmer": "Mock Farmer", "technology": "Mock Tech", "investment": "₹10 lakhs/hectare", "roi": "200% in 3 years", "icon": "🌽", "trend": "up"},
        ],
        "historicalData": [
            {"year": "2023", "totalProduction": "332 MT", "productivity": "2,500 kg/ha", "cropped": "195 Mha", "highlights": [f"Data filtered for {state} state."]},
        ],
        "cropPerformance": [
            {"crop": "Rice", "current": "129 MT", "target": "135 MT", "performance": 96, "trend": "stable"},
        ]
    }
    # --- END MOCK IMPLEMENTATION ---


# -------------------- EXISTING CRUD FUNCTIONS (Integrated) --------------------

# --- Farmer CRUD ---
def get_farmer_by_email(db: Session, email: str):
    # This function is now used by get_user_by_email, but it's kept for profile fetching
    return db.query(models.Farmer).filter(models.Farmer.email == email).first()

def get_farmers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Farmer).offset(skip).limit(limit).all()

def create_farmer(db: Session, farmer: schemas.FarmerCreate):
    hashed_password = pwd_context.hash(farmer.password)
    # Ensure role is set during creation if required by your model
    db_farmer = models.Farmer(
        email=farmer.email, 
        name=farmer.name, 
        hashed_password=hashed_password,
        # role=farmer.role # Uncomment if models.Farmer has a 'role' field
    )
    db.add(db_farmer); db.commit(); db.refresh(db_farmer)
    return db_farmer

# --- Crop CRUD ---
def get_crop(db: Session, crop_id: int):
    return db.query(models.Crop).filter(models.Crop.id == crop_id).first()

def get_crops(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Crop).offset(skip).limit(limit).all()

def create_crop(db: Session, crop: schemas.CropCreate):
    db_crop = models.Crop(**crop.dict())
    db.add(db_crop); db.commit(); db.refresh(db_crop)
    return db_crop

# --- Scheme CRUD ---
def get_schemes(db: Session, state: Optional[str] = None, skip: int = 0, limit: int = 100):
    query = db.query(models.Scheme)
    if state:
        query = query.filter(models.Scheme.state.ilike(f"%{state}%"))
    return query.offset(skip).limit(limit).all()

def create_scheme(db: Session, scheme: schemas.SchemeCreate):
    db_scheme = models.Scheme(**scheme.dict())
    db.add(db_scheme); db.commit(); db.refresh(db_scheme)
    return db_scheme

# --- Expert CRUD ---
def get_experts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Expert).offset(skip).limit(limit).all()

def create_expert(db: Session, expert: schemas.ExpertCreate):
    db_expert = models.Expert(**expert.dict())
    db.add(db_expert); db.commit(); db.refresh(db_expert)
    return db_expert

# --- CropProduction CRUD ---
def create_crop_production(db: Session, item: schemas.CropProductionCreate, crop_id: int):
    db_item = models.CropProduction(**item.dict(), crop_id=crop_id)
    db.add(db_item); db.commit(); db.refresh(db_item)
    return db_item

def get_crop_productions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.CropProduction).offset(skip).limit(limit).all()










