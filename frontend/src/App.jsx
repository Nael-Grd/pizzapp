import { useState, useEffect, use } from 'react'

function App() {
  const [ingredients, setIngredients] = useState([])
  const [newIngredient, setNewIngredient] = useState("")

  const [pizzas, setPizzas] = useState([])
  const [nouveauNom, setNom] = useState("")
  const [nouveauPrix, setPrix] = useState(0)
  const [ingredientsSelectionnes, setIngredientsSelectionnes] = useState([])

  const chargerIngredients = () => {
    fetch("http://127.0.0.1:8000/ingredients")
    .then(response => response.json())
    .then(donnes => {
      setIngredients(donnes)
    })
  }
  
  const ajouterIngredient = (e) => {
    e.preventDefault()   // empeche la page de se recherger/clignoter
    fetch("http://127.0.0.1:8000/ingredients", 
      {method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nom: newIngredient})
      }
    )
    .then(() => {   // fonction felchée anonyme pour attendre la rep du serveur avant execution
      setNewIngredient("") // On vide le champ texte
      chargerIngredients() // On recharge la liste
    })
  }

  const supprimerIngredient = (id) => {
    fetch("http://127.0.0.1:8000/ingredients/" + id,
      {method: "DELETE"}
    )
    .then(() => {
      chargerIngredients()
    })
  }

  const chargerPizzas = () => {
    fetch("http://127.0.0.1:8000/menu")
    .then(response => response.json())
    .then(donnes => {
      setPizzas(donnes)
    })
  }

  const creerPizza = (e) => {
    e.preventDefault()
    fetch("http://127.0.0.1:8000/menu",
      {method: "POST",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify({nom: nouveauNom, prix: nouveauPrix, ingredients: ingredientsSelectionnes}) 
      }
    )
    .then(() => {
      chargerPizzas()
      setNom("")
      setPrix(0)
      setIngredientsSelectionnes([])
    })
  }

  useEffect(() => {
    chargerIngredients()
    chargerPizzas()

  }, [])
  

  return (
    <div>
    {/* INGREDIENTS */}
    <form onSubmit={ajouterIngredient}>
      <button type="submit">Ajouter l'ingrédient</button>
      <input type='text' value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} />
    </form>
    <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          {ingredient.nom}
          <button onClick={() => supprimerIngredient(ingredient.id)} type="button">Supprimer l'ingrédient</button>
        </li>
      ))}
    </ul>

    {/* PIZZAS */}
    <form onSubmit={creerPizza}>
      <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <input type="checkbox" checked={ingredientsSelectionnes.includes(ingredient.id)}
                  onChange={(e) => { if (e.target.checked) { setIngredientsSelectionnes([...ingredientsSelectionnes, ingredient.id]) }
                                     else { setingredientsSelectionnes(ingredientsSelectionnes.filter((id) => id !== ingredient.id)) }
                                   }                        
         }/>{ingredient.nom}
        </li>
      ))}
      </ul>
      <input type="text" value={nouveauNom} onChange={(e) => setNom(e.target.value)} />
      <input type="number" value={nouveauPrix} onChange={(e) => setPrix(e.target.value)} />
      <button type="submit">Ajouter la pizza</button>
    </form>

    <ul>
      {pizzas.map((pizza) => (          // return implicite
        <li key={pizza.id}>
          {pizza.nom} - {pizza.prix} €
        </li>
      ))  
      }
    </ul>
    </div>


  )
}

export default App
