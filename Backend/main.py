# main.py (Final Updated Version)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Added CORS Import

import models
import database

# Added 'auth' and 'chat' to the imports
from api.routers import farmers, schemes, crops, experts, crop_production, auth, chat

# ... (Database setup remains the same) ...
models.Base.metadata.create_all(bind=database.engine)


app = FastAPI(
    title="AgriProject API",
    description="A complete and functional prototype API for a modern agricultural application.",
    version="1.0.0",
)

# 1. ADDED: CORS Middleware Configuration 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 2. MODIFIED: All routers included with prefix="/api"
app.include_router(farmers.router, prefix="/api")
app.include_router(schemes.router, prefix="/api")
app.include_router(crops.router, prefix="/api")
app.include_router(experts.router, prefix="/api")
app.include_router(crop_production.router, prefix="/api")
app.include_router(auth.router, prefix="/api") 
app.include_router(chat.router, prefix="/api")

# ... (Root endpoint remains the same) ...
@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the AgriProject API! See /docs for documentation."}









# # main.py

# from fastapi import FastAPI

# # Database models aur connection import karte hain
# import models
# import database

# # Yaha apni sari APIs (routes) alag files me banayi gayi hain
# # farmers.py, schemes.py, crops.py, experts.py, crop_production.py
# # Inhe yaha import karke main app ke sath integrate karte hain
# from api.routers import farmers, schemes, crops, experts, crop_production

# #Ye line ensure karti hai ki jab app start hoga
# # tab database me jo tables aapne models.py me define kiye hain,
# # wo automatically create ho jayein (agar pehle se na ho to).
# models.Base.metadata.create_all(bind=database.engine)



# #  Yaha FastAPI application ka main object banaya ja raha hai.
# # Is object ke andar aap title, description aur version define kar sakte ho.
# app = FastAPI(
#     title="AgriProject API",
#     description="A complete and functional prototype API for a modern agricultural application.",
#     version="1.0.0",
# )

# # This includes all the API endpoint files from the api/routers folder

# #Yaha hum apne alag-alag route files ko include kar rahe hain.
# # Matlab: farmers.py me jo API endpoints banaye gaye hain, 
# # wo ab main app me integrate ho gaye.
# app.include_router(farmers.router)
# app.include_router(schemes.router)
# app.include_router(crops.router)
# app.include_router(experts.router)
# app.include_router(crop_production.router)


# # Ye ek root endpoint hai jo basic info deta hai
# # Agar koi sirf http://127.0.0.1:8000/ open kare,
# # to ye message return hoga.
# @app.get("/", tags=["Root"])
# def read_root():
#     return {"message": "Welcome to the AgriProject API! See /docs for documentation."}








# # yaha se tanu ka h

# from fastapi import FastAPI, Depends
# from sqlalchemy.orm import Session
# from database import SessionLocal, Base, engine
# from models import Scheme  # your DB model class

# from fastapi.middleware.cors import CORSMiddleware

# Base.metadata.create_all(bind=engine)

# app = FastAPI()

# # CORS so frontend (React/Vite) can call the API
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # set to your frontend URL in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # DB dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # Example GET route
# @app.get("/api/schemes")
# def get_schemes(db: Session = Depends(get_db)):
#     schemes = db.query(Scheme).all()
#     return schemes
