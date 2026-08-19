
function FormulairePizza({creerPizza, 
                        nouvelleBase, setNouvelleBase, 
                        ingredients, 
                        ingredientsSelectionnes, setIngredientsSelectionnes, 
                        estVege, setEstVege, 
                        nouveauNom, nouveauPrix, setNom, setPrix}) {

    return(
        <div>
            <form className="bg-white min-h-screen rounded-lg shadow-md p-2" onSubmit={creerPizza}>
                <div className="flex justify-center gap-3 mt-10">
                    <label>Base de la pizza :</label>
                    <select className="bg-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-500" value={nouvelleBase} onChange={(e) => setNouvelleBase(e.target.value)}>
                        <option value="Tomate">Tomate</option>
                        <option value="Crème">Crème</option>
                        <option value="Blanche">Blanche</option>
                    </select>
                </div>
                <ul className="grid grid-cols-3 gap-4">
                {ingredients.map((ingredient) => (
                    <li className="flex items-center gap-2" key={ingredient.id}>
                    <input type="checkbox" checked={ingredientsSelectionnes.includes(ingredient.id)}
                            onChange={(e) => { if (e.target.checked) { setIngredientsSelectionnes([...ingredientsSelectionnes, ingredient.id]) }
                                                else { setIngredientsSelectionnes(ingredientsSelectionnes.filter((id) => id !== ingredient.id)) }
                                            }                        
                    }/>{ingredient.nom}
                    </li>
                ))}
                </ul>
                <div className="flex justify-between items-center gap-4 mt-8">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={estVege} onChange={(e) => setEstVege(e.target.checked)} />Pizza végétarienne
                    </label>
                    <input className="flex-1 bg-gray-300 border px-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={nouveauNom} placeholder="Nom de la pizza"  onChange={(e) => setNom(e.target.value)} />
                    <input className="w-24 bg-gray-300 border px-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" value={nouveauPrix} placeholder="Prix" onChange={(e) => setPrix(e.target.value)} />
                    <button className="bg-green-500 text-white font-bold rounded-md px-6 h-10 hover:bg-green-700" type="submit">Ajouter la pizza</button>
                </div>
            </form>
        </div>
    )

}

export default FormulairePizza