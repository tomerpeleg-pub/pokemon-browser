import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

/**
 * Pokemon Card component
 *
 * TODO:
 * - loading state
 * - style attacks list
 * - unit tests
 */
export class PokemonCard extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      .PokemonCard__content {
        display: block;
        border-radius: 5px;
        border: 10px solid #d7b01f;
        background: #463f3a;
        padding: 10px;
        color: #f4f3ee;
        font-family: sans-serif;
        padding: 20px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .PokemonCard__image {
        border-radius: 5px;
        overflow: hidden;
        display: block;
        width: 100%;
      }

      .PokemonCard__number {
        top: 15px;
        left: 30px;
        margin: 0;
        font-size: 0.8em;
        font-weight: bold;
        margin: 0;
      }

      .PokemonCard__attacks {
        text-align: left;
      }

      .Attack--special td:first-child::before {
        content: "S: ";
        opacity: 0.7;
      }
    `;
  }

  static get properties() {
    return {
      isLoading: Boolean,
      id: String,
      number: String,
      image: String,
      name: String,
      attacks: Object,
    };
  }

  constructor() {
    super();
    this.classes = {
      "is-loading": this.isLoading,
    };
  }

  render() {
    // TODO:
    // - refactor attack types
    return html`
      <div class="PokemonCard__content ${classMap(this.classes)}">
        <p class="PokemonCard__number">${this.number}</p>
        <img class="PokemonCard__image" src="${this.image}" alt="" />
        <h1 class="PokemonCard__name">${this.name}!</h1>

        <p>Resistant: <strong>${this.resistant?.join(", ")}</strong>.</p>
        <p>weaknesses: <strong>${this.weaknesses?.join(", ")}</strong>.</p>

        <table class="PokemonCard__attacks">
          <thead>
            <tr>
              <th>Type</th>
              <th>Attack</th>
              <th>Damage</th>
            </tr>
          </thead>

          <tbody>
            ${this.attacks?.fast?.map(
              (attack, index) => html` <tr
                class="Attack Attack--fast"
                .index=${index}
              >
                <td>${attack.type}</td>
                <td>${attack.name}</td>
                <td>${attack.damage}</td>
              </tr>`
            )}
            ${this.attacks?.special?.map(
              (attack, index) => html` <tr
                class="Attack Attack--special"
                .index=${index}
              >
                <td>${attack.type}</td>
                <td>${attack.name}</td>
                <td>${attack.damage}</td>
              </tr>`
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
