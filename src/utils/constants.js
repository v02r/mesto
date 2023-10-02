export const profileEditButton = document.querySelector('.profile__edit-button');
export const addMestoButton = document.querySelector('.profile__add-button');
export const formEditProfile = document.querySelector('.popup_type_edit .popup__form');
export const formAddMesto = document.querySelector('.popup_type_add-mesto .popup__form');
export const mestoNameInput = document.querySelector('.popup_type_add-mesto .popup__input_type_mesto');
export const imgLinkInput = document.querySelector('.popup_type_add-mesto .popup__input_type_link');
export const inputName = document.querySelector('.popup_type_edit .popup__input_type_name');
export const inputJob = document.querySelector('.popup_type_edit .popup__input_type_job');

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинская область',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал',
  },
];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__end-button',
  inactiveButtonClass: 'popup__end-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error-message_visible',
};
