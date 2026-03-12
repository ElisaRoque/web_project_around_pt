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
const nameTitle = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const nameProfileForm = formProfile.querySelector(".popup__input_type_name");
const descriptionProfileForm = formProfile.querySelector(
  ".popup__input_type_description",
);

/* vars cards */
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#cardTemplate")
  .content.querySelector(".card");
const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");

/* vars form cards */
const addCardButton = document.querySelector(".profile__add-button");
const modalNewCard = document.querySelector("#new-card-popup");
const closePopupCard = modalNewCard.querySelector(".popup__close");
const formNewCard = modalNewCard.querySelector("#new-card-form");

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
  if (!cardLink) {
    linkElement.src = "./images/placeholder.jpg";
  } else {
    linkElement.src = cardLink;
  }

  const nameElement = cardElement.querySelector(".card__title");
  if (!cardName) {
    nameElement.textContent = "Lugar sem nome";
  } else {
    nameElement.textContent = cardName;
  }
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

/* listeners */
editProfileButton.addEventListener("click", function () {
  handleOpenEditModal(modalEditProfile);
});

addCardButton.addEventListener("click", function () {
  openModal(modalNewCard);
});

closePopupProfile.addEventListener("click", function (e) {
  closeModal(modalEditProfile);
});

closePopupCard.addEventListener("click", function (e) {
  closeModal(modalNewCard);
});

closeImagePopup.addEventListener("click", function (e) {
  closeModal(modalImagePopup);
});

formProfile.addEventListener("submit", handleProfileFormSubmit);

formNewCard.addEventListener("submit", handleCardFormSubmit);
