from sqlalchemy import Column, Integer, String, Date, DECIMAL, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# 🔹 Farmers Table
class Farmer(Base):
    __tablename__ = "farmers"
    farmer_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100))
    district = Column(String(100))
    land_size = Column(DECIMAL(10,2))
    contact = Column(String(20))

    crops = relationship("FarmerCrop", back_populates="farmer")
    schemes = relationship("FarmerScheme", back_populates="farmer")


# 🔹 Crops Table
class Crop(Base):
    __tablename__ = "crops"
    crop_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    crop_name = Column(String(100))
    season = Column(String(50))
    soil_type = Column(String(100))
    yield_amount = Column(DECIMAL(10,2))
    market_price = Column(DECIMAL(10,2))

    farmers = relationship("FarmerCrop", back_populates="crop")


# 🔹 FarmerCrops (Many-to-Many junction)
class FarmerCrop(Base):
    __tablename__ = "farmer_crops"
    farmer_crop_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    farmer_id = Column(Integer, ForeignKey("farmers.farmer_id"))
    crop_id = Column(Integer, ForeignKey("crops.crop_id"))

    farmer = relationship("Farmer", back_populates="crops")
    crop = relationship("Crop", back_populates="farmers")


# 🔹 Schemes Table
class Scheme(Base):
    __tablename__ = "schemes"
    scheme_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    scheme_name = Column(String(200))
    state_district = Column(String(100))
    eligibility = Column(Text)
    benefits = Column(Text)
    start_date = Column(Date)
    end_date = Column(Date)

    farmers = relationship("FarmerScheme", back_populates="scheme")


# 🔹 FarmerSchemes (Many-to-Many junction)
class FarmerScheme(Base):
    __tablename__ = "farmer_schemes"
    farmer_scheme_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    farmer_id = Column(Integer, ForeignKey("farmers.farmer_id"))
    scheme_id = Column(Integer, ForeignKey("schemes.scheme_id"))
    application_date = Column(Date)
    status = Column(String(50))

    farmer = relationship("Farmer", back_populates="schemes")
    scheme = relationship("Scheme", back_populates="farmers")


# 🔹 Experts Table
class Expert(Base):
    __tablename__ = "experts"
    expert_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100))
    specialization = Column(String(100))
    advisory_data = Column(Text)

    advisories = relationship("ExpertAdvisory", back_populates="expert")


# 🔹 ExpertAdvisory Table
class ExpertAdvisory(Base):
    __tablename__ = "expert_advisory"
    advisory_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    expert_id = Column(Integer, ForeignKey("experts.expert_id"))
    farmer_id = Column(Integer, ForeignKey("farmers.farmer_id"))
    advice = Column(Text)
    date = Column(Date)

    expert = relationship("Expert", back_populates="advisories")
    farmer = relationship("Farmer")

password = Column(String(255))
