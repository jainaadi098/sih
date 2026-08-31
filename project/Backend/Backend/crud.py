from sqlalchemy.orm import Session
from passlib.context import CryptContext
import models, schemas

# Password hashing ke liye setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Farmer CRUD ---
def get_farmer_by_email(db: Session, email: str):
    return db.query(models.Farmer).filter(models.Farmer.email == email).first()
def get_farmers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Farmer).offset(skip).limit(limit).all()
def create_farmer(db: Session, farmer: schemas.FarmerCreate):
    hashed_password = pwd_context.hash(farmer.password)
    db_farmer = models.Farmer(email=farmer.email, name=farmer.name, hashed_password=hashed_password)
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
# Add Optional and models to your imports if they aren't there
from typing import Optional
import models

def get_schemes(db: Session, state: Optional[str] = None, skip: int = 0, limit: int = 100):
    query = db.query(models.Scheme)

    # If a state is provided, add the filter
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