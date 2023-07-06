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

const popupName = formEditProfile.querySelector('.popup__input_type_name');
const popupJob = formEditProfile.querySelector('.popup__input_type_job');
const formAddMesto = document.querySelector('#formAddMesto');
const mestoNameInput = formAddMesto.querySelector('.popup__input_type_mesto');
const imgLinkInput = formAddMesto.querySelector('.popup__input_type_link');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__title-bigimage');
const imagePopupCloseButton = imagePopup.querySelector('.popup__cancel-button_type_image');

// Добавление карточек
const initialCards = [
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

const template = document.querySelector('#template-element');
const container = document.querySelector('.elements');

function createCard(name, link, alt) {
  const cardTemplate = template.content.cloneNode(true);
  const titleElement = cardTemplate.querySelector('.elements__title');
  const imageElement = cardTemplate.querySelector('.elements__image');
  const likeButton = cardTemplate.querySelector('.elements__like-button');
  const deleteButton = cardTemplate.querySelector('.elements__delete-button');

  titleElement.textContent = name;
  imageElement.src = link;
  imageElement.alt = name;

  likeButton.addEventListener('click', toggleLikeButton);
  function toggleLikeButton() {
    likeButton.classList.toggle('elements__like-button_active');
  }

  deleteButton.addEventListener('click', deleteCard);
  function deleteCard() {
    const card = deleteButton.closest('.elements__card');
    card.remove();
  }

  function openImagePopup() {
    imagePopupImage.src = link;
    imageElement.alt = name;
    imagePopupTitle.textContent = name;
    openPopup(imagePopup);
  }

  function closeImagePopup() {
    closePopup(imagePopup);
  }

  imageElement.addEventListener('click', openImagePopup);
  imagePopupCloseButton.addEventListener('click', closeImagePopup);

  return cardTemplate;
}

function renderCard(name, link, alt) {
  const card = createCard(name, link, alt);
  container.prepend(card);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});

function handleAddMestoFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = mestoNameInput.value;
  const linkValue = imgLinkInput.value;

  renderCard(nameValue, linkValue);
  formAddMesto.reset();
  closePopup(popupAddMesto);
}

function openEditProfilePopup() {
  popupName.value = nameInput.textContent;
  popupJob.value = jobInput.textContent;
  openPopup(popupProfile);
}

function openAddMestoPopup() {
  openPopup(popupAddMesto);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = popupName.value;
  jobInput.textContent = popupJob.value;
  closePopup(popupProfile);
}

addMestoButton.addEventListener('click', openAddMestoPopup);
profileEditButton.addEventListener('click', openEditProfilePopup);
popupCancelButtonEdit.addEventListener('click', () => closePopup(popupProfile));
popupCancelButtonAdd.addEventListener('click', () => closePopup(popupAddMesto));
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
formAddMesto.addEventListener('submit', handleAddMestoFormSubmit);

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}