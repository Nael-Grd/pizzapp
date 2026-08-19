
function GestionIngredients({ajouterIngredient, newIngredient, setNewIngredient, ingredients, supprimerIngredient}) {

    return( 
        <div>
            <form className="flex justify-center mt-4 mb-4 px-3 py-1" onSubmit={ajouterIngredient}>
                <input className="bg-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-1" type='text' placeholder="Nom de l'ingrédient" value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} />
                <button className="bg-green-500 text-white font-bold rounded-sm hover:bg-green-900 px-3 py-1 ml-4" type="submit">Ajouter l'ingrédient</button>
            </form>
            <ul>
            {ingredients.map((ingredient) => (
                <li className="flex justify-between gap-3 shadow-sm  px-3 py-1 text-center" key={ingredient.id}>
                    {ingredient.nom}
                <button className="bg-red-500 text-white rounded-md hover:bg-red-900 px-3 py-1" onClick={() => supprimerIngredient(ingredient.id)} type="button">Supprimer l'ingrédient</button>
                </li>
            ))}
            </ul>
        </div>
    )

}

export default GestionIngredients