import ListePizzas from "../components/ListePizzas";

function Accueil({pizzas, supprimerPizza}) {
    
    return (
        <div>
            <ListePizzas pizzas={pizzas} supprimerPizza={supprimerPizza}/> 
        </div>
    )
}

export default Accueil