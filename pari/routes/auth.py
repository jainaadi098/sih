from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Farmer, Expert
from schemas import FarmerCreate, FarmerLogin, ExpertCreate, ExpertLogin, Token
from auth import hash_password, verify_password, create_access_token
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Farmer Register
@router.post("/farmer/register", response_model=Token)
def register_farmer(data: FarmerCreate, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.contact == data.contact).first()
    if farmer:
        raise HTTPException(status_code=400, detail="Farmer already registered")
    new_farmer = Farmer(
        name=data.name,
        district=data.district,
        land_size=data.land_size,
        contact=data.contact,
        password=hash_password(data.password)
    )
    db.add(new_farmer)
    db.commit()
    db.refresh(new_farmer)

    token = create_access_token({"sub": str(new_farmer.farmer_id)}, timedelta(minutes=60))
    return {"access_token": token, "token_type": "bearer"}


# Farmer Login
@router.post("/farmer/login", response_model=Token)
def login_farmer(data: FarmerLogin, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.contact == data.contact).first()
    if not farmer or not verify_password(data.password, farmer.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": str(farmer.farmer_id)}, timedelta(minutes=60))
    return {"access_token": token, "token_type": "bearer"}


# Expert Register
@router.post("/expert/register", response_model=Token)
def register_expert(data: ExpertCreate, db: Session = Depends(get_db)):
    expert = db.query(Expert).filter(Expert.name == data.name).first()
    if expert:
        raise HTTPException(status_code=400, detail="Expert already exists")
    new_expert = Expert(
        name=data.name,
        specialization=data.specialization,
        advisory_data=data.advisory_data,
        password=hash_password(data.password)
    )
    db.add(new_expert)
    db.commit()
    db.refresh(new_expert)

    token = create_access_token({"sub": str(new_expert.expert_id)}, timedelta(minutes=60))
    return {"access_token": token, "token_type": "bearer"}


# Expert Login
@router.post("/expert/login", response_model=Token)
def login_expert(data: ExpertLogin, db: Session = Depends(get_db)):
    expert = db.query(Expert).filter(Expert.name == data.name).first()
    if not expert or not verify_password(data.password, expert.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": str(expert.expert_id)}, timedelta(minutes=60))
    return {"access_token": token, "token_type": "bearer"}
