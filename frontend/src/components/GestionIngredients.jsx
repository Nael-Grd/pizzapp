
function GestionIngredients({ajouterIngredient, newIngredient, setNewIngredient, ingredients, supprimerIngredient}) {

    return( 
        <div>
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
        </div>
    )

}

export default GestionIngredients