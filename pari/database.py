from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# SQLite URL (local file)
DATABASE_URL = "sqlite:///./pari_db.db"

# Create engine
engine = create_engine(DATABASE_URL, echo=True, connect_args={"check_same_thread": False})

# Session maker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class
class Base(DeclarativeBase):
    pass
from sqlalchemy import String, Integer, Column
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    email = Column(String(50), unique=True)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, DeclarativeBase

# # Database URL (replace with your MySQL credentials)
# DATABASE_URL = "mysql+pymysql://root:Aadi@098@localhost:3306/pari_db"

# # Create engine
# engine = create_engine(DATABASE_URL, echo=True)

# # Session maker
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # Base class for models
# class Base(DeclarativeBase):
#     pass

# # Dependency (FastAPI me use karne ke liye)
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
