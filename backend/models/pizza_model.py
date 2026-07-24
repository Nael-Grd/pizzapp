from sqlalchemy import Column, Integer, String, Float, Boolean, Table, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

pizza_ingredients_assoc = Table(
    "pizza_ingredient_association", 
    Base.metadata,       # BD ratachée
    Column("pizza_id", Integer, ForeignKey("pizzas.id", ondelete="CASCADE")),
    Column("ingredient_id", Integer, ForeignKey("ingredients.id", ondelete="CASCADE")))

class PizzaModel(Base):   # condition pour dire à l'ORM que c'est une BD
    __tablename__ = "pizzas"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True)
    base = Column(String)
    prix = Column(Float)
    vegetarienne = Column(Boolean)
    ingredients = relationship("IngredientModel", secondary=pizza_ingredients_assoc)   # secondary car bcp d'args secondaires


class IngredientModel(Base):
    __tablename__ = "ingredients"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True, unique=True)

