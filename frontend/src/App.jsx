import { useState, useEffect, use } from 'react'
import ListePizzas from './components/ListePizzas'
import FormulairePizza from './components/FormulairePizza'

function App() {
  const [ingredients, setIngredients] = useState([])
  const [newIngredient, setNewIngredient] = useState("")

  const [pizzas, setPizzas] = useState([])
  const [nouvelleBase, setNouvelleBase] = useState("Tomate")
  const [nouveauNom, setNom] = useState("")
  const [nouveauPrix, setPrix] = useState(0)
  const [estVege, setEstVege] = useState(false)
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
       body: JSON.stringify({nom: nouveauNom, 
                            base: nouvelleBase,
                            prix: Number(nouveauPrix), 
                            vegetarienne : estVege,
                            ingredients_ids: ingredientsSelectionnes}) 
      }
    )
    .then(() => {
      chargerPizzas()
      setNom("")
      setPrix(0)
      setIngredientsSelectionnes([])
    })
  }

  const supprimerPizza = (id) => {
    fetch('http://127.0.0.1:8000/menu/' + id,
      {method: "DELETE", 
      }
    )
    .then(() => {
      chargerPizzas()
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
    <FormulairePizza creerPizza={creerPizza} 
                    nouvelleBase={nouvelleBase} setNouvelleBase={setNouvelleBase}
                    ingredients={ingredients}
                    ingredientsSelectionnes={ingredientsSelectionnes} setIngredientsSelectionnes={setIngredientsSelectionnes} 
                    estVege={estVege} setEstVege={setEstVege}
                    nouveauNom={nouveauNom} nouveauPrix={nouveauPrix} setNom={setNom} setPrix={setPrix} />

    <ListePizzas pizzas={pizzas} supprimerPizza={supprimerPizza}/> 

    </div>


  )
}

export default App
