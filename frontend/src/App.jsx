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

    const [erreurReseau, setErreurReseau] = useState(null)
    const [erreurAction, setErreurAction] = useState(null)

    const chargerIngredients = () => {
        getIngredients()
        .then(donnes => {
            setIngredients(donnes)
            setErreurReseau(null)
        })
        .catch(erreur => {
            setErreurReseau('Erreur : serveur injoingnable')
        })
        .finally(() => {
            setChargementIngredients(false)
        })
    }
    
    const ajouterIngredient = (e) => {
        e.preventDefault()   // empeche la page de se recherger/clignoter
        postIngredient(newIngredient)
        .then(() => {     // fonction felchée anonyme pour attendre la rep du serveur avant execution
            setNewIngredient("") // On vide le champ texte
            chargerIngredients() // On recharge la liste
        })
        .catch(erreur => {
            setErreurAction("Impossible d'ajouter l'ingrédient")
            setTimeout(() => {
                setErreurAction(null)
            }, 3000);
        })
        
    }

    const supprimerIngredient = (id) => {
        deleteIngredient(id)
        .then(() => {
            chargerIngredients()
        })
        .catch(erreur => {
            setErreurAction("Impossible de supprimer l'ingrédient")
            setTimeout(() => {
                setErreurAction(null)
            }, 3000);
        })
    }

    const chargerPizzas = () => {
        getPizzas()
        .then(donnes => { 
            setPizzas(donnes)
            setErreurReseau(null)
        })
        .catch(erreur => {
            setErreurReseau('Erreur : serveur injoingnable')
        })
        .finally(() => {
            setChargementPizzas(false)
        })
    }

    const creerPizza = (e) => {
        e.preventDefault()
        postPizza(nouveauNom, nouvelleBase, nouveauPrix, estVege, ingredientsSelectionnes)
        .then(() => {
            chargerPizzas()
            setNom("")
            setPrix(0)
            setIngredientsSelectionnes([])
            setEstVege(false)
        })
        .catch(erreur => {
            setErreurAction("Impossible d'ajouter la pizza")
            setTimeout(() => {
                setErreurAction(null)
            }, 3000);
        })
    }

    const supprimerPizza = (id) => {
        deletePizza(id)
        .then(() => {
            chargerPizzas()
        })
        .catch(erreur => {
            setErreurAction("Impossible de supprimer la pizza")
            setTimeout(() => {
                setErreurAction(null)
            }, 3000);
        })
    }

    useEffect(() => {
        chargerPizzas()
        chargerIngredients()
    }, [])

    return (
        <BrowserRouter>
        <div className="bg-gray-200 h-screen ">
            
            <nav className='bg-gray-700 text-white shadow-xl text-center flex justify-center gap-4 px-4 py-2'>
                <Link className='hover:text-yellow-500' to={"/admin"}>Administration</Link>
                <Link className='hover:text-yellow-500' to={"/"}>Retour au menu</Link>
            </nav>

            {erreurReseau && 
                <div className="bg-red-500 text-white font-bold p-4 text-center">
                    {erreurReseau}
                </div>
            }

            {erreurAction && (
                <div className="fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg font-bold animate-bounce">
                    {erreurAction}
                </div>
)}

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