from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, Table, Date
from sqlalchemy.orm import relationship
from database import Base

# Farmer aur Crop ke beech Many-to-Many relationship ke liye join table.
farmer_crop_association = Table(
    'farmer_crops', Base.metadata,
    Column('farmer_id', Integer, ForeignKey('farmers.id'), primary_key=True),
    Column('crop_id', Integer, ForeignKey('crops.id'), primary_key=True)
)

class Farmer(Base):
    __tablename__ = "farmers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=True)
    farm_area = Column(Float, nullable=True)
    farm_area_unit = Column(String(20), default='acres')
    email = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(128))
    crops = relationship("Crop", secondary=farmer_crop_association, back_populates="farmers")

class Crop(Base):
    __tablename__ = "crops"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    season = Column(String(50), nullable=True)
    duration_days = Column(Integer, nullable=True)
    farmers = relationship("Farmer", secondary=farmer_crop_association, back_populates="crops")
    production_data = relationship("CropProduction", back_populates="crop")

class Scheme(Base):
    __tablename__ = "schemes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150))
    description = Column(Text, nullable=True)
    eligibility = Column(Text, nullable=True)
    benefits = Column(Text, nullable=True)
    start_date = Column(Date, nullable=True)
    state = Column(String(50), index=True) 
    status = Column(String(50), default='Active')

class Expert(Base):
    __tablename__ = "experts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    specialization = Column(String(100))
    contact = Column(String(100), nullable=True)
    location = Column(String(100), nullable=True)

class CropProduction(Base):
    __tablename__ = "crop_production"
    id = Column(Integer, primary_key=True, index=True)
    crop_id = Column(Integer, ForeignKey('crops.id'))
    region = Column(String(100))
    season = Column(String(50))
    year = Column(Integer)
    area_hectare = Column(Float, nullable=True)
    production_tonnes = Column(Float, nullable=True)
    demand_tonnes = Column(Float, nullable=True)
    surplus_deficit = Column(Float, nullable=True)
    crop = relationship("Crop", back_populates="production_data")