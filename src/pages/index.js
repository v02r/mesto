import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import {
  initialCards,
  profileEditButton,
  addMestoButton,
  formEditProfile,
  formAddMesto,
  config,
  inputName,
  inputJob,
} from '../utils/constants.js';

const formValidatorEditProfile = new FormValidator(config, formEditProfile);
const formValidatorAddMesto = new FormValidator(config, formAddMesto);
const popupImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__job',
});

function renderCard(name, link, alt) {
  const card = new Card(name, link, alt, '#template-element', handleCardClick, handleDeleteCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function openEditProfilePopup() {
  const { name, about } = userInfo.getUserInfo();
  inputName.value = name;
  inputJob.value = about;

  popupProfileForm.open();
}

function openAddMestoPopup() {
  popupAddMestoForm.open();
}

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function handleDeleteCardClick(cardElement) {
  cardElement.remove();
}

addMestoButton.addEventListener('click', openAddMestoPopup);
profileEditButton.addEventListener('click', openEditProfilePopup);

formValidatorEditProfile.enableValidation();
formValidatorAddMesto.enableValidation();

const cardsSection = new Section({
  items: initialCards,
  renderer: (card) => {
    const cardElement = renderCard(card.name, card.link, card.alt);
    cardsSection.addItem(cardElement);
  },
}, '.elements');

cardsSection.renderItems();

const popupProfileForm = new PopupWithForm('.popup_type_edit', (formData) => {
  const name = formData['p-name'];
  const about = formData['p-job'];

  userInfo.setUserInfo({ name, about });
  popupProfileForm.close();
});

popupProfileForm.setEventListeners();

const popupAddMestoForm = new PopupWithForm('.popup_type_add-mesto', (formData) => {
  const cardElement = renderCard(formData['place-name'], formData['img-link'], '');
  cardsSection.addItem(cardElement);
  popupAddMestoForm.close();
});

popupAddMestoForm.setEventListeners();

const imagePopupCloseButton = document.querySelector('.popup__cancel-button_type_image');
imagePopupCloseButton.addEventListener('click', () => popupImage.close());