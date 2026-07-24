from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from routers.pizza import router as pizza_router
from models.pizza_model import PizzaModel  # Il FAUT importer le modèle ici pour que l'Architecte le lise avant de construire

# Construction BD
Base.metadata.create_all(bind=engine)  # "Prends tous les modèles connus et crée les tables dans SQLite"

app = FastAPI()
app.include_router(pizza_router)

origines_autorisees = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origines_autorisees, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"] )
