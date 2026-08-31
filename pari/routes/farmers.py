from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Farmer
from schemas import FarmerCreate
from typing import List

router = APIRouter(prefix="/farmers", tags=["Farmers"])

# Get all farmers
@router.get("/", response_model=List[FarmerCreate])
def get_farmers(db: Session = Depends(get_db)):
    return db.query(Farmer).all()

# Get farmer by ID
@router.get("/{farmer_id}", response_model=FarmerCreate)
def get_farmer(farmer_id: int, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.farmer_id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmer

# Update farmer
@router.put("/{farmer_id}", response_model=FarmerCreate)
def update_farmer(farmer_id: int, data: FarmerCreate, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.farmer_id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    farmer.name = data.name
    farmer.district = data.district
    farmer.land_size = data.land_size
    farmer.contact = data.contact
    db.commit()
    db.refresh(farmer)
    return farmer

# Delete farmer
@router.delete("/{farmer_id}")
def delete_farmer(farmer_id: int, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.farmer_id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    db.delete(farmer)
    db.commit()
    return {"message": "Farmer deleted successfully"}
