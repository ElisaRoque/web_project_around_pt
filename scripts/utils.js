export function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

export function handleEscClose(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function handleOverlayClose(e) {
  const popup = e.target.closest(".popup");
  if (e.target === popup) {
    closeModal(popup);
  }
}
