import { openModal } from "./utils.js";

export class Card {
  constructor({ name, link }, cardSelector) {
    this.cardName = name;
    this.cardLink = link;
    this.cardSelector = cardSelector;
  }

  renderCard() {
    this.cardsContainer = document.querySelector(this.cardSelector);
    this.cardEl = this._getCardElement(this.cardName, this.cardLink);
    this.cardsContainer.append(this.cardEl);
  }

  renderNewCard() {
    this.cardsContainer = document.querySelector(this.cardSelector);
    this.cardEl = this._getCardElement(this.cardName, this.cardLink);
    this.cardsContainer.prepend(this.cardEl);
  }

  _setEventListeners() {
    this.cardLikeBtn.addEventListener("click", () => {
      this.cardLikeBtn.classList.toggle("card__like-button_is-active");
    });

    this.cardDeleteBtn.addEventListener("click", () => {
      this.cardElement.remove();
    });
  }

  _getCardElement() {
    const cardTemplate = document
      .querySelector("#cardTemplate")
      .content.querySelector(".card");
    this.cardElement = cardTemplate.cloneNode(true);
    this.cardLikeBtn = this.cardElement.querySelector(".card__like-button");
    this.cardDeleteBtn = this.cardElement.querySelector(".card__delete-button");

    const linkElement = this.cardElement.querySelector(".card__image");
    linkElement.src = this.cardLink;

    const nameElement = this.cardElement.querySelector(".card__title");
    nameElement.textContent = this.cardName;
    linkElement.alt = nameElement.textContent;

    linkElement.addEventListener("click", () => {
      const popupImage = document.querySelector(".popup__image");
      const popupCaption = document.querySelector(".popup__caption");
      const modalImagePopup = document.querySelector("#image-popup");
      popupImage.src = this.cardLink;
      popupCaption.textContent = this.cardName;
      openModal(modalImagePopup);
    });

    this._setEventListeners();
    return this.cardElement;
  }
}
