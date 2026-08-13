import FormulairePizza from "../components/FormulairePizza";
import GestionIngredients from "../components/GestionIngredients";

function Admin({ajouterIngredient, newIngredient, setNewIngredient, ingredients, supprimerIngredient,
                creerPizza, 
                        nouvelleBase, setNouvelleBase,
                        ingredientsSelectionnes, setIngredientsSelectionnes, 
                        estVege, setEstVege, 
                        nouveauNom, nouveauPrix, setNom, setPrix
}) {
    
    return(
        <div>
            <GestionIngredients ajouterIngredient={ajouterIngredient} newIngredient={newIngredient} setNewIngredient={setNewIngredient} 
                        ingredients={ingredients} supprimerIngredient={supprimerIngredient} />

            <FormulairePizza creerPizza={creerPizza} 
                        nouvelleBase={nouvelleBase} setNouvelleBase={setNouvelleBase}
                        ingredients={ingredients}
                        ingredientsSelectionnes={ingredientsSelectionnes} setIngredientsSelectionnes={setIngredientsSelectionnes} 
                        estVege={estVege} setEstVege={setEstVege}
                        nouveauNom={nouveauNom} nouveauPrix={nouveauPrix} setNom={setNom} setPrix={setPrix} />
        </div>
    )
}

export default Admin