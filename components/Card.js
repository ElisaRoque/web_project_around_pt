export class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
  ) {
    this.cardName = name;
    this.cardLink = link;
    this._id = _id;
    this.cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._isLiked = isLiked;
    this._handleLikeClick = handleLikeClick;
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
      this._handleLikeClick(this);
    });

    this.cardDeleteBtn.addEventListener("click", () => {
      this._handleDeleteClick(this);
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
    this.setLikes(this._isLiked);

    this.cardElement.querySelector(".card__title").textContent = this.cardName;

    this._setEventListeners();

    return this.cardElement;
  }

  removeCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  setLikes(isLiked) {
    this._isLiked = isLiked;

    if (this._isLiked) {
      this.cardLikeBtn.classList.add("card__like-button_is-active");
    } else {
      this.cardLikeBtn.classList.remove("card__like-button_is-active");
    }
  }
}
