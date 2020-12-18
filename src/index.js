import "./index.css";
import { PokemonCard } from "./modules/pokemon-card";
import PokemonList from "./modules/pokemon-list";

// hack
if (!window.customElements.get("pokemon-card")) {
  window.customElements.define("pokemon-card", PokemonCard);
  window.customElements.define("pokemon-list", PokemonList);
}
