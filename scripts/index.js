import { initialCards } from './constants.js';
import Card from './Card.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const addMestoButton = document.querySelector('.profile__add-button');
const popupCancelButtonEdit = document.querySelector('.popup__cancel-button_type_edit');
const popupCancelButtonAdd = document.querySelector('.popup__cancel-button_type_add');
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddMesto = document.querySelector('.popup_type_add-mesto');
const elementProfile = document.querySelector('.profile');
const nameInput = document.querySelector('.profile__name');
const jobInput = document.querySelector('.profile__job');
const formEditProfile = document.querySelector('#formEditProfile');
const formAddMesto = document.querySelector('#formAddMesto');
const mestoNameInput = formAddMesto.querySelector('.popup__input_type_mesto');
const imgLinkInput = formAddMesto.querySelector('.popup__input_type_link');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupTitle = imagePopup.querySelector('.popup__title-bigimage');
const imagePopupCloseButton = imagePopup.querySelector('.popup__cancel-button_type_image');
const template = document.querySelector('#template-element');
const container = document.querySelector('.elements');

function renderCard(name, link, alt, templateSelector) {
  const card = new Card(name, link, alt, templateSelector);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

function handleAddMestoFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = mestoNameInput.value;
  const linkValue = imgLinkInput.value;

  renderCard(nameValue, linkValue, '', '#template-element');
  formAddMesto.reset();
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
