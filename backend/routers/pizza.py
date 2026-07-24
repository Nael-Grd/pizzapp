from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from database import get_db

from models.pizza_model import PizzaModel, IngredientModel
from schemas.pizza_schema import NouvellePizza, NouvelIngredient, Pizza

router = APIRouter()

# Route 1 : acceuil
@router.get("/")
def acceuil():
    return {"message" : "Bienvenu a la pizzeria Napoli !"}

# Route 2 : carte des pizzas
@router.get("/menu", response_model=List[Pizza])   # pour affichage ordre Model
def voir_menu(db: Session = Depends(get_db)):
    menu = db.query(PizzaModel).all()
    return menu

@router.get("/menu/{id_pizza}")
def voir_pizza(id_pizza: int, db: Session = Depends(get_db)):
    pizza = db.query(PizzaModel).filter(PizzaModel.id == id_pizza).first()
    if not pizza:
        raise HTTPException(status_code = 404, detail = "Cette pizza n'existe pas ! ")
    return pizza

@router.get("/rechercher")
def rechercher_pizzas(max_prix: float = 20, db: Session = Depends(get_db)):   # Query param, par defaut 20
    pizzas = db.query(PizzaModel).filter(PizzaModel.prix <= max_prix).all()
    return pizzas

@router.get("/ingredients")
def voir_ingredients(db: Session = Depends(get_db)):
    ingredients = db.query(IngredientModel).all()
    return ingredients

@router.post("/ingredients")
def ajouter_ingredient(ingredient: NouvelIngredient, db: Session = Depends(get_db)):
    ingredient_model = IngredientModel(**ingredient.model_dump())
    db.add(ingredient_model)
    db.commit()
    db.refresh(ingredient_model)
    return  {"message": f"L'ingrédient {ingredient.nom} a été ajoutée avec succès !"}

@router.delete("/ingredients/{id_ingredient}")
def supprimer_ingredient(id_ingredient: int, db: Session = Depends(get_db)):
    ingredient = db.query(IngredientModel).filter(IngredientModel.id == id_ingredient).first()
    if not ingredient:
        raise HTTPException(status_code=404, detail = "Ingredient non existant !")
    db.delete(ingredient)
    db.commit()
    return  {"message": f"L'ingrédient {ingredient.nom} a été ajoutée supprimé !"}


@router.post("/menu")
def creer_pizza(pizza: NouvellePizza, db: Session = Depends(get_db)):
    nouvelle_pizza_model = PizzaModel(**pizza.model_dump(exclude={"ingredients_ids"}))

    ingredients_ids = pizza.ingredients_ids
    ingredients = []
    for id in ingredients_ids:
        ingredient = db.query(IngredientModel).filter(IngredientModel.id == id).first()
        if not ingredient:
            raise HTTPException(status_code=404, detail = "Ingredient non trouvé !")
        ingredients.append(ingredient)

    nouvelle_pizza_model.ingredients = ingredients
    db.add(nouvelle_pizza_model)
    db.commit()
    db.refresh(nouvelle_pizza_model)   # apres la sauvegarde, sqlite a mis l'id   

    return {"message": f"La pizza {pizza.nom} a été ajoutée avce succès !", "pizza": nouvelle_pizza_model}

@router.delete("/menu/{id_pizza}")
def supprimer_pizza(id_pizza: int, db: Session = Depends(get_db)):
    pizza = db.query(PizzaModel).filter(PizzaModel.id == id_pizza).first()
    if not pizza:
        raise HTTPException(status_code = 404, detail = "Pizza non trouvée !")
    db.delete(pizza)
    db.commit()
    return f"La pizza {pizza.nom} a été suppriméé !"
    
@router.put("/menu/{id_pizza}")
def modifier_pizza(id_pizza: int, nouvelle_pizza: NouvellePizza, db: Session = Depends(get_db)):
    pizza = db.query(PizzaModel).filter(PizzaModel.id == id_pizza).first()
    if not pizza:
        raise HTTPException(status_code = 404, detail = "Pizza non trouvée !")
    
    for cle, valeur in nouvelle_pizza.model_dump(exclude={"ingredients_ids"}).items(): # type: ignore
        setattr(pizza, cle, valeur)    # correspond à pizza.nom = "..."
    ingredients = []
    for id in nouvelle_pizza.ingredients_ids:
        ingredient = db.query(IngredientModel).filter(IngredientModel.id == id).first()
        if not ingredient:
            raise HTTPException(status_code=404, detail="L'ingredient n'existe pas !")
        ingredients.append(ingredient)
    pizza.ingredients = ingredients

    db.commit()
    return f"La pizza {pizza.nom} a été modifiée correctement"

