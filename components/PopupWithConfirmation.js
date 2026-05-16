import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);

    this._handleSubmit = handleSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
  }

  open(cardInstance) {
    this._cardInstance = cardInstance;

    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleSubmit(this._cardInstance);
    });
  }
}
