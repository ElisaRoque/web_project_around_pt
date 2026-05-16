import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._popupForm.querySelector(".popup__button");
    this._buttonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".popup__input");
    const values = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Salvando...";
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._renderLoading(true);

      this._handleFormSubmit(this._getInputValues()).finally(() => {
        this._renderLoading(false);
      });
    });
  }
  close() {
    this._popupForm.reset();
    super.close();
  }
}
