from pydantic import BaseModel
from typing import Optional

# Farmer Register/Login
class FarmerCreate(BaseModel):
    name: str
    district: str
    land_size: float
    contact: str
    password: str

class FarmerLogin(BaseModel):
    contact: str
    password: str

# Expert Register/Login
class ExpertCreate(BaseModel):
    name: str
    specialization: str
    advisory_data: Optional[str] = None
    password: str

class ExpertLogin(BaseModel):
    name: str
    password: str

# Token Response
class Token(BaseModel):
    access_token: str
    token_type: str
