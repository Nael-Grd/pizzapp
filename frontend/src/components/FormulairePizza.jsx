
function FormulairePizza({creerPizza, 
                        nouvelleBase, setNouvelleBase, 
                        ingredients, 
                        ingredientsSelectionnes, setIngredientsSelectionnes, 
                        estVege, setEstVege, 
                        nouveauNom, nouveauPrix, setNom, setPrix}) {

    return(
        <div>
            <form onSubmit={creerPizza}>
                <label>Base de la pizza :</label>
                <select value={nouvelleBase} onChange={(e) => setNouvelleBase(e.target.value)}>
                    <option value="Tomate">Tomate</option>
                    <option value="Crème">Crème</option>
                    <option value="Blanche">Blanche</option>
                </select>
                <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                    <input type="checkbox" checked={ingredientsSelectionnes.includes(ingredient.id)}
                            onChange={(e) => { if (e.target.checked) { setIngredientsSelectionnes([...ingredientsSelectionnes, ingredient.id]) }
                                                else { setIngredientsSelectionnes(ingredientsSelectionnes.filter((id) => id !== ingredient.id)) }
                                            }                        
                    }/>{ingredient.nom}
                    </li>
                ))}
                </ul>
                <label>
                    <input type="checkbox" checked={estVege} onChange={(e) => setEstVege(e.target.checked)} />Pizza végétarienne
                </label>
                <input type="text" value={nouveauNom} placeholder="Nom de la pizza"  onChange={(e) => setNom(e.target.value)} />
                <input type="number" value={nouveauPrix} placeholder="Prix" onChange={(e) => setPrix(e.target.value)} />
                <button type="submit">Ajouter la pizza</button>
            </form>
        </div>
    )

}

export default FormulairePizza