

function ListePizzas({pizzas, supprimerPizza }) {

    return( 
        <div>
            <ul>
            {pizzas.map((pizza) => (          // return implicite
                <li key={pizza.id}>
                {pizza.nom} - {pizza.prix} €
                <button onClick={() => supprimerPizza(pizza.id)} type="button">primer la pizza</button>
                </li>
            ))  
            }
            </ul>
        </div>
    )

}

export default ListePizzas