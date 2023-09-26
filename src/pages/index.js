import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  profileEditButton,
  addMestoButton,
  popupCancelButtonEdit,
  popupCancelButtonAdd,
  popupProfile,
  popupAddMesto,
  elementProfile,
  nameInput,
  jobInput,
  formEditProfile,
  formAddMesto,
  mestoNameInput,
  imgLinkInput,
  imagePopup,
  imagePopupTitle,
  imagePopupCloseButton,
  template,
  container,
  initialCards,
  config,
} from '../utils/constants.js';

let formValidatorAddMesto;
let popupImage;

function renderCard(name, link, alt, templateSelector) {
  const card = new Card(name, link, alt, templateSelector, handleCardClick);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

function handleAddMestoFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = mestoNameInput.value;
  const linkValue = imgLinkInput.value;

  renderCard(nameValue, linkValue, '', '#template-element');
  formAddMesto.reset();
  formValidatorAddMesto.disableSubmitButton();
  closePopup(popupAddMesto);
}

function openEditProfilePopup() {
  const popupName = formEditProfile.querySelector('.popup__input_type_name');
  const popupJob = formEditProfile.querySelector('.popup__input_type_job');
  popupName.value = nameInput.textContent;
  popupJob.value = jobInput.textContent;
  openPopup(popupProfile);
}

function openAddMestoPopup() {
  openPopup(popupAddMesto);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const popupName = formEditProfile.querySelector('.popup__input_type_name');
  const popupJob = formEditProfile.querySelector('.popup__input_type_job');
  nameInput.textContent = popupName.value;
  jobInput.textContent = popupJob.value;
  closePopup(popupProfile);
}

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function addEscListener() {
  document.addEventListener('keydown', handleEscKeydown);
}

function removeEscListener() {
  document.removeEventListener('keydown', handleEscKeydown);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEscListener();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEscListener();
}

function handleEscKeydown(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', handleEscKeydown);
  addMestoButton.addEventListener('click', openAddMestoPopup);
  profileEditButton.addEventListener('click', openEditProfilePopup);
  popupCancelButtonEdit.addEventListener('click', () => closePopup(popupProfile));
  popupCancelButtonAdd.addEventListener('click', () => closePopup(popupAddMesto));
  formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
  formAddMesto.addEventListener('submit', handleAddMestoFormSubmit);
  popupProfile.addEventListener('click', handleOverlayClick);
  popupAddMesto.addEventListener('click', handleOverlayClick);
  imagePopup.addEventListener('click', handleOverlayClick);

  initialCards.forEach((card) => {
    renderCard(card.name, card.link, card.alt, '#template-element');
  });

  const formValidatorEditProfile = new FormValidator(config, formEditProfile);
  formValidatorAddMesto = new FormValidator(config, formAddMesto);

  formValidatorEditProfile.enableValidation();
  formValidatorAddMesto.enableValidation();

  popupImage = new PopupWithImage('.popup_type_image');
  popupImage.setEventListeners();
});