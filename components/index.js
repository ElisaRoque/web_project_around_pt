import { Api } from "./Api.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Popup } from "./Popup.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "0e02cfab-0e26-4b28-9472-ddccc62ea186",
    "Content-Type": "application/json",
  },
});

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

const profileImage = document.querySelector(".profile__image");
const editAvatarButton = document.querySelector(".profile__image-edit-button");
const avatarForm = document.querySelector("#edit-photo-profile-form");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

/* --- api carrgamento inicial --- */

api
  .getInitialData()
  .then(([userData, initialCards]) => {
    nameTitle.textContent = userData.name;
    description.textContent = userData.about;
    profileImage.src = userData.avatar;

    initialCards.forEach((card) => {
      const cardInstance = new Card(
        card,
        ".cards__list",
        handleImageClick,
        handleDeleteClick,
        handleLikeClick,
      );
      cardInstance.renderCard();
    });
  })
  .catch((err) => {
    console.log(err);
  });

/* --- popups --- */

// popup editar perfil
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const profilePopup = new PopupWithForm("#edit-popup", (data) => {
  return api
    .setUserApi(data.name, data.description)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });

      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

profilePopup.setEventListeners();

// popup editar foto perfil

const avatarPopup = new PopupWithForm("#edit-photo-popup", (data) => {
  return api
    .updateAvatar(data.link)
    .then((userData) => {
      profileImage.src = userData.avatar;

      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

avatarPopup.setEventListeners();

// popup novo card
const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  return api
    .setNewCard(data["place-name"], data.link)
    .then((imageData) => {
      const cardInstance = new Card(
        {
          name: imageData.name,
          link: imageData.link,
          _id: imageData._id,
          isLiked: imageData.isLiked,
        },
        ".cards__list",
        handleImageClick,
        handleDeleteClick,
        handleLikeClick,
      );

      cardInstance.renderCard(true);
    })
    .catch((err) => {
      console.log(err);
    });
});

newCardPopup.setEventListeners();

// popup imagem
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

// popup delete card

const deleteCardPopup = new PopupWithConfirmation(
  "#delete-card-popup",
  (cardInstance) => {
    api
      .deleteCard(cardInstance._id)
      .then(() => {
        cardInstance.removeCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
);

deleteCardPopup.setEventListeners();

/* --- validação --- */

const profileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const avatarValidator = new FormValidator(validationConfig, avatarForm);
const profileValidator = new FormValidator(validationConfig, profileForm);
const cardValidator = new FormValidator(validationConfig, newCardForm);

profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();

/* --- listeners --- */

editProfileButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();

  nameInput.value = data.name;
  jobInput.value = data.job;

  profileValidator.resetValidation();

  profilePopup.open();
});

addCardButton.addEventListener("click", () => {
  cardValidator.resetValidation();
  newCardPopup.open();
});

editAvatarButton.addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarPopup.open();
});

/* --- functions --- */

function handleDeleteClick(cardInstance) {
  deleteCardPopup.open(cardInstance);
}

function handleLikeClick(cardInstance) {
  let likeRequest;

  if (cardInstance._isLiked) {
    likeRequest = api.removeLike(cardInstance._id);
  } else {
    likeRequest = api.addLike(cardInstance._id);
  }

  likeRequest
    .then((updatedCard) => {
      cardInstance.setLikes(updatedCard.isLiked);
    })
    .catch((err) => {
      console.log(err);
    });
}
