from pydantic import BaseModel, Field, ConfigDict
from typing import List

class IngredientBase(BaseModel):
    nom: str

class Ingredient(IngredientBase):
    id: int
    model_config = ConfigDict(from_attributes=True)  # dit au schema de lire direct l'objet sql

class NouvelIngredient(BaseModel):
    nom: str

class NouvellePizza(BaseModel):
    # id: int géneré autom a partir de maintenant
    nom: str = Field(min_length=3) 
    base: str = Field(min_length=3)
    prix: float = Field(gt=0)
    vegetarienne: bool 
    ingredients_ids: List[int] = []

class Pizza(NouvellePizza):
    id: int
    ingredients: List[Ingredient] = []
    model_config = ConfigDict(from_attributes=True)



    # Sans pydantic 
#
# class NouvellePizzaClassique:
#     def __init__(self, id: int, nom: str, base: str, prix: float, vegetarienne: bool):
#         self.id = id
#         self.nom = nom
#         self.base = base
#         self.prix = prix
#         self.vegetarienne = vegetarienne