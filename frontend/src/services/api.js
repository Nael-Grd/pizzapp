
const BASE_URL = "http://127.0.0.1:8000"

export const getPizzas = () => {
    return fetch(BASE_URL + '/menu')
           .then(response => response.json())
}

export const getIngredients = () => {
    return fetch(BASE_URL + "/ingredients")
        .then(response => response.json())
}

export const postIngredient = (nomIngredient) => {
    return fetch(BASE_URL + "/ingredients", 
      {method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nom: nomIngredient})
      })
}

export const deleteIngredient = (id) => {
    return fetch(BASE_URL + "/ingredients/" + id,
      {method: "DELETE"}
    )
}

export const postPizza = (nouveauNom, nouvelleBase, nouveauPrix, estVege, ingredientsSelectionnes) => {
    return fetch(BASE_URL + "/menu",
      {method: "POST",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify({nom: nouveauNom, 
                            base: nouvelleBase,
                            prix: Number(nouveauPrix), 
                            vegetarienne : estVege,
                            ingredients_ids: ingredientsSelectionnes}) 
      }
    )
}

export const deletePizza = (id) => {
    return fetch(BASE_URL + '/menu/' + id,
        {
            method: "DELETE", 
        }
    )
}