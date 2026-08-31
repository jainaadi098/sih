from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Crop
from typing import List

router = APIRouter(prefix="/crops", tags=["Crops"])

# Get all crops
@router.get("/", response_model=List[dict])
def get_crops(db: Session = Depends(get_db)):
    return db.query(Crop).all()

# Add new crop
@router.post("/")
def add_crop(crop: dict, db: Session = Depends(get_db)):
    new_crop = Crop(**crop)
    db.add(new_crop)
    db.commit()
    db.refresh(new_crop)
    return new_crop

# Update crop
@router.put("/{crop_id}")
def update_crop(crop_id: int, crop: dict, db: Session = Depends(get_db)):
    existing_crop = db.query(Crop).filter(Crop.crop_id == crop_id).first()
    if not existing_crop:
        raise HTTPException(status_code=404, detail="Crop not found")
    for key, value in crop.items():
        setattr(existing_crop, key, value)
    db.commit()
    db.refresh(existing_crop)
    return existing_crop

# Delete crop
@router.delete("/{crop_id}")
def delete_crop(crop_id: int, db: Session = Depends(get_db)):
    crop = db.query(Crop).filter(Crop.crop_id == crop_id).first()
    if not crop:
        raise HTTPException(status_code=404, detail="Crop not found")
    db.delete(crop)
    db.commit()
    return {"message": "Crop deleted successfully"}
