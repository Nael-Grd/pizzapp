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

  const [chargementPizzas, setChargementPizzas] = useState(true)
  const [chargementIngredients, setChargementIngredients] = useState(true)

  const chargerIngredients = () => {
    return getIngredients().then(donnes => {
      setIngredients(donnes)
    })
    .then(() => {
        setChargementIngredients(false)
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
    return getPizzas().then(donnes => {   //return pour que App sache quand la prommesse est finie
        setPizzas(donnes)
    })
    .then(() => {
        setChargementPizzas(false)
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
    chargerPizzas()
    chargerIngredients()
  }, [])
  

    if(enChargement) {
        return <div>Chargement des données...</div>
    }

    return (
        <BrowserRouter>
        <div>
            
            <Link to={"/admin"}>Administration</Link>
            <Link to={"/"}>Retour au menu</Link>

            <Routes>
                <Route path='/' element={<Accueil pizzas={pizzas} supprimerPizza={supprimerPizza} chargementPizzas={chargementPizzas} />} />
                <Route path='/admin' element={<Admin ajouterIngredient={ajouterIngredient} newIngredient={newIngredient} setNewIngredient={setNewIngredient} 
                                                ingredients={ingredients} supprimerIngredient={supprimerIngredient}
                                                creerPizza={creerPizza} nouvelleBase={nouvelleBase} setNouvelleBase={setNouvelleBase}
                                                ingredientsSelectionnes={ingredientsSelectionnes} setIngredientsSelectionnes={setIngredientsSelectionnes} 
                                                estVege={estVege} setEstVege={setEstVege}
                                                nouveauNom={nouveauNom} nouveauPrix={nouveauPrix} setNom={setNom} setPrix={setPrix} 
                                                chargementIngredients={chargementIngredients}/>} /> 
            </Routes>

        </div>
        </BrowserRouter>
  )
}

export default App