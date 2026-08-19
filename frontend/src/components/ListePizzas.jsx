

function ListePizzas({pizzas, supprimerPizza }) {

    return( 
        <div>
            <ul>
            {pizzas.map((pizza) => (          // return implicite
                <li className="bg-white-950 rounded-md py-5 px-4 mb-4 flex justify-between items-center shadow-sm" key={pizza.id}>
                    {pizza.nom} - {pizza.prix} €
                <button className="bg-red-500 text-white rounded-md hover:bg-red-900 px-4 py-2" onClick={() => supprimerPizza(pizza.id)} type="button">Supprimer la pizza</button>
                </li>
            ))  
            }
            </ul>
        </div>
    )

}

export default ListePizzas