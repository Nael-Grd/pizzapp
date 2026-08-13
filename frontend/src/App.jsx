import { useState, useEffect, use } from 'react'
import  { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import Accueil from "./pages/Accueil"
import Admin from "./pages/Admin"

import { getPizzas, getIngredients, postIngredient, deleteIngredient, postPizza, deletePizza } from "./services/api.js"


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
    getIngredients().then(donnes => {
      setIngredients(donnes)
    })
  }
  
  const ajouterIngredient = (e) => {
    e.preventDefault()   // empeche la page de se recherger/clignoter
    postIngredient(newIngredient).then(() => {   // fonction felchée anonyme pour attendre la rep du serveur avant execution
        setNewIngredient("") // On vide le champ texte
        chargerIngredients() // On recharge la liste
    })
  }

  const supprimerIngredient = (id) => {
    deleteIngredient(id).then(() => {
      chargerIngredients()
    })
  }

  const chargerPizzas = () => {
    getPizzas().then(donnes => {
        setPizzas(donnes)
    })
  }

  const creerPizza = (e) => {
    e.preventDefault()
    postPizza(nouveauNom, nouvelleBase, nouveauPrix, estVege, ingredientsSelectionnes).then(() => {
        chargerPizzas()
        setNom("")
        setPrix(0)
        setIngredientsSelectionnes([])
    })
  }

  const supprimerPizza = (id) => {
    deletePizza(id).then(() => {
        chargerPizzas()
    })
  }

  useEffect(() => {
    chargerIngredients()
    chargerPizzas()
  }, [])
  

  return (
    <BrowserRouter>
    <div>
        
        <Link to={"/admin"}>Administration</Link>
        <Link to={"/"}>Retour au menu</Link>

        <Routes>
            <Route path='/' element={<Accueil pizzas={pizzas} supprimerPizza={supprimerPizza}/>} />
            <Route path='/admin' element={<Admin ajouterIngredient={ajouterIngredient} newIngredient={newIngredient} setNewIngredient={setNewIngredient} 
                                            ingredients={ingredients} supprimerIngredient={supprimerIngredient}
                                            creerPizza={creerPizza} nouvelleBase={nouvelleBase} setNouvelleBase={setNouvelleBase}
                                            ingredientsSelectionnes={ingredientsSelectionnes} setIngredientsSelectionnes={setIngredientsSelectionnes} 
                                            estVege={estVege} setEstVege={setEstVege}
                                            nouveauNom={nouveauNom} nouveauPrix={nouveauPrix} setNom={setNom} setPrix={setPrix} />} /> 
        </Routes>

    </div>
    </BrowserRouter>
  )
}

export default App