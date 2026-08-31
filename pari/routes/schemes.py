from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Scheme
from typing import List

router = APIRouter(prefix="/schemes", tags=["Schemes"])

# Get all schemes
@router.get("/", response_model=List[dict])
def get_schemes(db: Session = Depends(get_db)):
    return db.query(Scheme).all()

# Add scheme
@router.post("/")
def add_scheme(scheme: dict, db: Session = Depends(get_db)):
    new_scheme = Scheme(**scheme)
    db.add(new_scheme)
    db.commit()
    db.refresh(new_scheme)
    return new_scheme

# Update scheme
@router.put("/{scheme_id}")
def update_scheme(scheme_id: int, scheme: dict, db: Session = Depends(get_db)):
    existing_scheme = db.query(Scheme).filter(Scheme.scheme_id == scheme_id).first()
    if not existing_scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    for key, value in scheme.items():
        setattr(existing_scheme, key, value)
    db.commit()
    db.refresh(existing_scheme)
    return existing_scheme

# Delete scheme
@router.delete("/{scheme_id}")
def delete_scheme(scheme_id: int, db: Session = Depends(get_db)):
    scheme = db.query(Scheme).filter(Scheme.scheme_id == scheme_id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    db.delete(scheme)
    db.commit()
    return {"message": "Scheme deleted successfully"}
