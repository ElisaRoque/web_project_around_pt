import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Popup } from "./Popup.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";

/* --- dados iniciais --- */

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

/* --- config validação --- */

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/* --- DOM --- */

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const nameTitle = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

/* --- popups --- */

// popup editar perfil
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const profilePopup = new PopupWithForm("#edit-popup", (data) => {
  userInfo.setUserInfo({
    name: data.name,
    job: data.description,
  });
});

profilePopup.setEventListeners();

// popup novo card
const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  const cardInstance = new Card(
    {
      name: data["place-name"],
      link: data.link,
    },
    ".cards__list",
    handleImageClick,
  );

  cardInstance.renderCard(true);
});

newCardPopup.setEventListeners();

// popup imagem
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

/* --- validação --- */

const profileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const profileValidator = new FormValidator(validationConfig, profileForm);
const cardValidator = new FormValidator(validationConfig, newCardForm);

profileValidator.enableValidation();
cardValidator.enableValidation();

/* --- carregamento de dados iniciais --- */

initialCards.forEach((card) => {
  const cardInstance = new Card(card, ".cards__list", handleImageClick);
  cardInstance.renderCard();
});

/* --- listeners --- */

editProfileButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();

  nameInput.value = data.name;
  jobInput.value = data.job;

  profilePopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
