# # main.py
# # 
from fastapi import FastAPI

# # Database models aur connection import karte hain
import models
import database

# # Yaha apni sari APIs (routes) alag files me banayi gayi hain
# # farmers.py, schemes.py, crops.py, experts.py, crop_production.py
# # Inhe yaha import karke main app ke sath integrate karte hain
from api.routers import farmers, schemes, crops, experts, crop_production

# #Ye line ensure karti hai ki jab app start hoga
# # tab database me jo tables aapne models.py me define kiye hain,
# # wo automatically create ho jayein (agar pehle se na ho to).
models.Base.metadata.create_all(bind=database.engine)



# #  Yaha FastAPI application ka main object banaya ja raha hai.
# # Is object ke andar aap title, description aur version define kar sakte ho.
app = FastAPI(
     title="AgriProject API",
     description="A complete and functional prototype API for a modern agricultural application.",
     version="1.0.0",
 )

# # This includes all the API endpoint files from the api/routers folder

# #Yaha hum apne alag-alag route files ko include kar rahe hain.
# # Matlab: farmers.py me jo API endpoints banaye gaye hain, 
# # wo ab main app me integrate ho gaye.
app.include_router(farmers.router)
app.include_router(schemes.router)
app.include_router(crops.router)
app.include_router(experts.router)
app.include_router(crop_production.router)


# # Ye ek root endpoint hai jo basic info deta hai
# # Agar koi sirf http://127.0.0.1:8000/ open kare,
# # to ye message return hoga.
@app.get("/", tags=["Root"])
def read_root():
    return {" Here "}



