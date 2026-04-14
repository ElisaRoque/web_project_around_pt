import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  openModal,
  closeModal,
  handleEscClose,
  handleOverlayClose,
} from "./utils.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

/* var validation forms */

const validationForms = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/* vars form profile */

const editProfileButton = document.querySelector(".profile__edit-button");
const modalEditProfile = document.querySelector("#edit-popup");
const closePopupProfile = modalEditProfile.querySelector(".popup__close");
const formProfile = modalEditProfile.querySelector("#edit-profile-form");
const profileFormValidator = new FormValidator(validationForms, formProfile);
const nameTitle = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const nameProfileForm = formProfile.querySelector(".popup__input_type_name");
const descriptionProfileForm = formProfile.querySelector(
  ".popup__input_type_description",
);

/* vars form cards */

const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");
const addCardButton = document.querySelector(".profile__add-button");
const modalNewCard = document.querySelector("#new-card-popup");
const closePopupCard = modalNewCard.querySelector(".popup__close");
const formNewCard = modalNewCard.querySelector("#new-card-form");
const cardFormValidator = new FormValidator(validationForms, formNewCard);

/* vars popup image */

const modalImagePopup = document.querySelector("#image-popup");
const closeImagePopup = modalImagePopup.querySelector(".popup__close");

/* form profile functions */

profileFormValidator.enableValidation();

function fillProfileForm() {
  nameProfileForm.value = nameTitle.textContent;
  descriptionProfileForm.value = description.textContent;
}

function handleOpenEditModal(modal) {
  openModal(modal);
  fillProfileForm();
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  nameTitle.textContent = nameProfileForm.value;
  description.textContent = descriptionProfileForm.value;

  closeModal(modalEditProfile);
}

/* form cards functions */

cardFormValidator.enableValidation();

function handleCardFormSubmit(e) {
  e.preventDefault();

  const newCard = {
    name: cardName.value,
    link: cardLink.value,
  };

  const cardInstance = new Card(newCard, ".cards__list");
  cardInstance.renderNewCard();

  formNewCard.reset();
  closeModal(modalNewCard);
}

initialCards.forEach((card) => {
  const cardInstance = new Card(card, ".cards__list");
  cardInstance.renderCard();
});

/* listeners */
editProfileButton.addEventListener("click", () => {
  handleOpenEditModal(modalEditProfile);
});

addCardButton.addEventListener("click", () => {
  openModal(modalNewCard);
});

closePopupProfile.addEventListener("click", () => {
  closeModal(modalEditProfile);
});

closePopupCard.addEventListener("click", () => {
  closeModal(modalNewCard);
});

closeImagePopup.addEventListener("click", () => {
  closeModal(modalImagePopup);
});

document.addEventListener("keydown", handleEscClose);

document.addEventListener("mousedown", handleOverlayClose);

formProfile.addEventListener("submit", handleProfileFormSubmit);

formNewCard.addEventListener("submit", handleCardFormSubmit);
