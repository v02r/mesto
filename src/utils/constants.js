export const profileEditButton = document.querySelector('.profile__edit-button');
export const addMestoButton = document.querySelector('.profile__add-button');
export const popupCancelButtonEdit = document.querySelector('.popup__cancel-button_type_edit');
export const popupCancelButtonAdd = document.querySelector('.popup__cancel-button_type_add');
export const popupProfile = document.querySelector('.popup_type_edit');
export const popupAddMesto = document.querySelector('.popup_type_add-mesto');
export const elementProfile = document.querySelector('.profile');
export const nameInput = document.querySelector('.profile__name');
export const jobInput = document.querySelector('.profile__job');
export const formEditProfile = document.querySelector('#formEditProfile');
export const formAddMesto = document.querySelector('#formAddMesto');
export const mestoNameInput = formAddMesto.querySelector('.popup__input_type_mesto');
export const imgLinkInput = formAddMesto.querySelector('.popup__input_type_link');
export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupTitle = imagePopup.querySelector('.popup__title-bigimage');
export const imagePopupCloseButton = imagePopup.querySelector('.popup__cancel-button_type_image');
export const template = document.querySelector('#template-element');
export const container = document.querySelector('.elements');
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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