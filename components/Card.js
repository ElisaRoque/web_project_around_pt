export class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.cardName = name;
    this.cardLink = link;
    this.cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  renderCard(prepend = false) {
    this.cardsContainer = document.querySelector(this.cardSelector);
    this.cardEl = this._getCardElement();

    if (prepend) {
      this.cardsContainer.prepend(this.cardEl);
    } else {
      this.cardsContainer.append(this.cardEl);
    }
  }

  _setEventListeners() {
    this.cardLikeBtn.addEventListener("click", () => {
      this.cardLikeBtn.classList.toggle("card__like-button_is-active");
    });

    this.cardDeleteBtn.addEventListener("click", () => {
      this.cardElement.remove();
    });

    this.cardImage.addEventListener("click", () => {
      this._handleImageClick(this.cardName, this.cardLink);
    });
  }

  _getCardElement() {
    const cardTemplate = document
      .querySelector("#cardTemplate")
      .content.querySelector(".card");

    this.cardElement = cardTemplate.cloneNode(true);

    this.cardLikeBtn = this.cardElement.querySelector(".card__like-button");
    this.cardDeleteBtn = this.cardElement.querySelector(".card__delete-button");
    this.cardImage = this.cardElement.querySelector(".card__image");

    this.cardImage.src = this.cardLink;
    this.cardImage.alt = this.cardName;

    this.cardElement.querySelector(".card__title").textContent = this.cardName;

    this._setEventListeners();

    return this.cardElement;
  }
}
