import { LitElement, html, css } from "lit-element";
// import "./PokemonList.css";

const pokemonGql = `
  id
  number
  name
  image
  resistant
  weaknesses
  attacks {
    fast {
      name
      type
      damage
    }
    special {
      name
      type
      damage
    }
  }
`;

const getPokemonQuery = (first) => `
    query {
      pokemons(first: ${first}) {
        ${pokemonGql}
      }
    }
`;

// TODO: update Graphql server to allow for searching by number
//
// const getSinglePokemonQuery = (number) => `
//     query {
//       pokemons(number: ${number}) {
//         ${pokemonGql}
//       }
//     }
// `;

// TODO:
// Should probably move to state manager, or at least a container.
const pokemonGraphqlEndpoint =
  process.env.REACT_APP_GRAPHQL_ENDPOING_URL || "http://localhost:5000";

export default class PokemonList extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      /**
       * TODO: 
       * - this is a really bad way to position these elems
       */
      .PokemonList__pokemon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        max-width: 400px;
      }

      .PokemonList__control {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 50px;
        height: 0;
        padding-top: 50px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.6);
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 50%;
        transition: background-color 0.12s ease-out;
      }

      .PokemonList__error,
      .PokemonList__loading {
        color: white;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .PokemonList__control[disabled] {
        pointer-events: none;
        opacity: 0.5;
      }

      .PokemonList__control:hover {
        background: rgba(255, 255, 255, 0.87);
      }

      .PokemonList__prev {
        left: calc(50% - 250px);
      }

      .PokemonList__next {
        left: calc(50% + 250px);
      }
    `;
  }

  constructor() {
    super();

    this.pokemon = [];

    // TODO: Would be etter to either get a subset or a single one at a time
    this.getPokemon().then(() => {
      this.currentIndex = 0;
      this.prevDisabled = true;
    });

    // TODO: Should be this.addEventListener, but not capturing events in pokemon-card
    document.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  static get properties() {
    return {
      isLoading: Boolean,
      isError: Boolean,
      errorMessage: String,
      pokemon: Array, // TODO: include full pokemon props?
      currentIndex: Number,
    };
  }

  async getPokemon(first = 151) {
    this.isLoading = true;

    return fetch(pokemonGraphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: getPokemonQuery(first) }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.pokemon = data.data.pokemons;
        this.requestUpdate("pokemon");
      })
      .catch((err) => {
        // TODO: show something on the page
        console.log("ERROR", err);
        this.isError = true;
        this.errorMessage = err;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  handlePrev() {
    if (this.pokemon && this.pokemon[this.currentIndex - 1]) {
      this.currentIndex--;
    }
    return this.currentIndex;
  }

  handleNext() {
    if (this.pokemon && this.pokemon[this.currentIndex + 1]) {
      this.currentIndex++;
    }
    return this.currentIndex;
  }

  handleKeydown(event) {
    switch (event.key) {
      case "ArrowLeft":
        this.handlePrev();
        break;

      case "ArrowRight":
        this.handleNext();
        break;
      default:
        break;
    }
  }

  render() {
    return html`<button
        class="PokemonList__control PokemonList__prev"
        @click="${this.handlePrev}"
        ?disabled="${!this.pokemon[this.currentIndex - 1]}"
      >
        Previous
      </button>

      <div class="PokemonList__content">
        ${!this.isLoading && !this.isError && this.pokemon[this.currentIndex]
          ? html` <pokemon-card
              data-index="${this.currentIndex}"
              class="PokemonList__pokemon"
              .name=${this.pokemon[this.currentIndex].name}
              .image=${this.pokemon[this.currentIndex].image}
              .number=${this.pokemon[this.currentIndex].number}
              .id=${this.pokemon[this.currentIndex].id}
              .attacks=${this.pokemon[this.currentIndex].attacks}
              .resistant=${this.pokemon[this.currentIndex].resistant}
              .weaknesses=${this.pokemon[this.currentIndex].weaknesses}
            ></pokemon-card>`
          : ``}
        ${this.isLoading
          ? html`<p class="PokemonList__loading">Loading...</p>`
          : ``}
        ${this.isError
          ? html`<p class="PokemonList__error">
              Error loading the pokemon. Please try again later.
            </p>`
          : ``}
      </div>

      <button
        class="PokemonList__control PokemonList__next"
        @click="${this.handleNext}"
        ?disabled="${!this.pokemon[this.currentIndex + 1]}"
      >
        Next
      </button>`;
  }
}
