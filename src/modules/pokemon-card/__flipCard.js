import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import backImg from "./pokemon-card-back.jpg";

/**
 * Pokemon Card component
 */
export class PokemonCard extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
        perspective: 1000px;
        width: 265px;
        height: 372px;
      }

      .PokemonCard__wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        transition: transform 1s;
        transform-style: preserve-3d;
      }

      .PokemonCard__wrapper.is-loading {
        transform: rotateY(180deg);
      }

      .PokemonCard__content,
      .PokemonCard__back {
        background: blue;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }

      .PokemonCard__back-img {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
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
      }

      .PokemonCard__content.is-loading {
        background: blue;
      }

      .PokemonCard__image {
        border-radius: 5px;
        overflow: hidden;
        display: block;
        width: 100%;
      }

      .PokemonCard__number {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
      }

      .PokemonCard__attacks {
        text-align: left;
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
      attacks: { type: Object },
    };
  }

  constructor() {
    super();
    this.classes = {
      "is-loading": this.isLoading,
    };
  }

  render() {
    return html`
      <div class="PokemonCard__wrapper ${classMap(this.classes)}">
        <div class="PokemonCard__content">
          <h1>${this.name}</h1>

          <img class="PokemonCard__image" src="${this.image}" alt="" />
          <p class="PokemonCard__number">${this.number}</p>

          <h1 class="PokemonCard__name">${this.name}!</h1>

          <table class="PokemonCard__attacks">
            <thead>
              <tr>
                <th>Type</th>
                <th>Attack</th>
                <th>Damage</th>
              </tr>
            </thead>

            <tbody>
              ${this.attacks.fast.map(
                (attack, index) => html` <tr .index=${index}>
                  <td>${attack.type}</td>
                  <td>${attack.name}</td>
                  <td>${attack.damage}</td>
                </tr>`
              )}
            </tbody>
          </table>
        </div>
        <div class="PokemonCard__back">
          <img class="PokemonCard__back-img" src=${backImg} alt="" />
        </div>
      </div>
    `;
  }

  _onClick() {
    this.count++;
  }
}
