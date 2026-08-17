import ListePizzas from "../components/ListePizzas";

function Accueil({pizzas, supprimerPizza, chargementPizzas}) {
    
    if(chargementPizzas) {
        return <div>Cuisson des pizzas en cours...</div>
    }
    return (
        <div>
            <ListePizzas pizzas={pizzas} supprimerPizza={supprimerPizza}/> 
        </div>
    )
}

export default Accueil