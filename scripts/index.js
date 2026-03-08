let initialCards = [
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

initialCards.forEach(function (e) {
  console.log(e);
});

const editProfileButton = document.querySelector(".profile__edit-button");
const modalEditProfile = document.querySelector("#edit-popup");
const closePopup = modalEditProfile.querySelector(".popup__close");
const formProfile = modalEditProfile.querySelector("#edit-profile-form");
let nameTitle = document.querySelector(".profile__title");
let description = document.querySelector(".profile__description");
let nameProfileForm = formProfile.querySelector(".popup__input_type_name");
let descriptionProfileForm = formProfile.querySelector(
  ".popup__input_type_description",
);

/* functions */
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

/* listners */
editProfileButton.addEventListener("click", function () {
  handleOpenEditModal(modalEditProfile);
});

closePopup.addEventListener("click", function (e) {
  closeModal(modalEditProfile);
});

formProfile.addEventListener("submit", handleProfileFormSubmit);
