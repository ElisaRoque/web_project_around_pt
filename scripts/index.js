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

/* vars form profile */
const editProfileButton = document.querySelector(".profile__edit-button");
const modalEditProfile = document.querySelector("#edit-popup");
const closePopupProfile = modalEditProfile.querySelector(".popup__close");
const formProfile = modalEditProfile.querySelector("#edit-profile-form");
const inputsProfile = formProfile.querySelectorAll(".popup__input");
const submitProfileButton = formProfile.querySelector(".popup__button");
const nameTitle = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const nameProfileForm = formProfile.querySelector(".popup__input_type_name");
const descriptionProfileForm = formProfile.querySelector(
  ".popup__input_type_description",
);

/* vars form cards */
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#cardTemplate")
  .content.querySelector(".card");
const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");
const addCardButton = document.querySelector(".profile__add-button");
const modalNewCard = document.querySelector("#new-card-popup");
const closePopupCard = modalNewCard.querySelector(".popup__close");
const formNewCard = modalNewCard.querySelector("#new-card-form");
const inputsNewCard = formNewCard.querySelectorAll(".popup__input");
const submitCardButton = formNewCard.querySelector(".popup__button");

/* vars popup image */
const modalImagePopup = document.querySelector("#image-popup");
const closeImagePopup = modalImagePopup.querySelector(".popup__close");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

/* form profile functions */
function fillProfileForm() {
  nameProfileForm.value = nameTitle.textContent;
  descriptionProfileForm.value = description.textContent;
}

function openModal(modalOpen) {
  modalOpen.classList.add("popup_is-opened");
}
function closeModal(modalClose) {
  modalClose.classList.remove("popup_is-opened");
}

function handleOpenEditModal(modal) {
  openModal(modal);
  fillProfileForm();
}

/* profile errors */

const showProfileInputError = (inputElement, errorMessage) => {
  const errorElement = formProfile.querySelector(
    `.${inputElement.id}-input-error`,
  );
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideProfileInputError = (inputElement) => {
  const errorElement = formProfile.querySelector(
    `.${inputElement.id}-input-error`,
  );
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
};

function toggleProfileButtonState() {
  const allValid = Array.from(inputsProfile).every(
    (input) => input.validity.valid,
  );
  submitProfileButton.disabled = !allValid;
}

inputsProfile.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showProfileInputError(input, input.validationMessage);
    } else {
      hideProfileInputError(input);
    }
    toggleProfileButtonState();
  });
});

function handleProfileFormSubmit(e) {
  e.preventDefault();
  nameTitle.textContent = nameProfileForm.value;
  description.textContent = descriptionProfileForm.value;

  closeModal(modalEditProfile);
}

/* cards */
function renderCard(cardName, cardLink) {
  const cardEl = getCardElement(cardName, cardLink);
  cardsContainer.append(cardEl);
}

function getCardElement(cardName, cardLink) {
  const cardElement = cardTemplate.cloneNode(true);
  const linkElement = cardElement.querySelector(".card__image");
  linkElement.src = cardLink;

  const nameElement = cardElement.querySelector(".card__title");
  nameElement.textContent = cardName;
  linkElement.alt = nameElement.textContent;

  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  linkElement.addEventListener("click", function () {
    popupImage.src = cardLink;
    popupCaption.textContent = cardName;
    openModal(modalImagePopup);
  });

  return cardElement;
}

/* form cards */
function handleCardFormSubmit(e) {
  e.preventDefault();

  const newCard = getCardElement(cardName.value, cardLink.value);
  cardsContainer.prepend(newCard);

  formNewCard.reset();
  closeModal(modalNewCard);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});

/* new card errors */

const showCardInputError = (inputElement, errorMessage) => {
  const errorElement = formNewCard.querySelector(
    `.${inputElement.id}-input-error`,
  );
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideCardInputError = (inputElement) => {
  const errorElement = formNewCard.querySelector(
    `.${inputElement.id}-input-error`,
  );
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
};

function toggleCardButtonState() {
  const allValid = Array.from(inputsNewCard).every(
    (input) => input.validity.valid,
  );
  submitCardButton.disabled = !allValid;
}

inputsNewCard.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showCardInputError(input, input.validationMessage);
    } else {
      hideCardInputError(input);
    }
    toggleCardButtonState();
  });
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

document.addEventListener("keydown", function (e) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup && e.key === "Escape") {
    closeModal(openedPopup);
  }
});

document.addEventListener("mousedown", (e) => {
  const popup = e.target.closest(".popup");
  if (e.target === popup) {
    closeModal(popup);
  }
});

formProfile.addEventListener("submit", handleProfileFormSubmit);

formNewCard.addEventListener("submit", handleCardFormSubmit);
