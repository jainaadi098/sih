# database.py

# 🔹 Required libraries import
# create_engine  → Database se connection banata hai
# declarative_base → Database tables ke liye Base class
# sessionmaker → Database ke sath session (connection instance) banane ke liye
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# 📌 Database URL
# "sqlite:///./pari_app.db" ka matlab hai ki project ke current folder me
# ek file 'pari_app.db' create hogi aur usme data store hoga.
# Example: agar MySQL use karna ho to URL aisa hota:
# "mysql+pymysql://user:password@localhost/dbname"
SQLALCHEMY_DATABASE_URL = "sqlite:///./pari_app.db"


# ⚡ Engine banate hain jo actual database connection handle karega.
# connect_args={"check_same_thread": False} → SQLite specific setting hai,
# jo multiple threads ko ek hi database access karne ki permission deta hai.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)


# 🌀 SessionLocal ek session factory hai.
# Iska matlab: jab bhi API call aayegi,
# to ek naya database session (connection) open hoga,
# aur kaam khatam hone ke baad close ho jayega.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



# 🏗️ Base class
# Jo bhi database models (tables) hum banayenge,
# wo sab is Base class ko inherit karenge.
# Isse SQLAlchemy ko pata chalega ki ye ek table hai
Base = declarative_base()