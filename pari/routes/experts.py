from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Expert
from typing import List

router = APIRouter(prefix="/experts", tags=["Experts"])

# Get all experts
@router.get("/", response_model=List[dict])
def get_experts(db: Session = Depends(get_db)):
    return db.query(Expert).all()

# Add new expert
@router.post("/")
def add_expert(expert: dict, db: Session = Depends(get_db)):
    new_expert = Expert(**expert)
    db.add(new_expert)
    db.commit()
    db.refresh(new_expert)
    return new_expert

# Update expert
@router.put("/{expert_id}")
def update_expert(expert_id: int, expert: dict, db: Session = Depends(get_db)):
    existing_expert = db.query(Expert).filter(Expert.expert_id == expert_id).first()
    if not existing_expert:
        raise HTTPException(status_code=404, detail="Expert not found")
    for key, value in expert.items():
        setattr(existing_expert, key, value)
    db.commit()
    db.refresh(existing_expert)
    return existing_expert

# Delete expert
@router.delete("/{expert_id}")
def delete_expert(expert_id: int, db: Session = Depends(get_db)):
    expert = db.query(Expert).filter(Expert.expert_id == expert_id).first()
    if not expert:
        raise HTTPException(status_code=404, detail="Expert not found")
    db.delete(expert)
    db.commit()
    return {"message": "Expert deleted successfully"}
