from fastapi import FastAPI
from database import engine, Base
from routes import auth, farmers, crops, schemes, experts

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(auth.router)
app.include_router(farmers.router)
app.include_router(crops.router)
app.include_router(schemes.router)
app.include_router(experts.router)

@app.get("/")
def root():
    return {"message": "AgriTech Backend running with CRUD APIs!"}
