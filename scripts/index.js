const profilEditButton = document.querySelector('.profile__edit-button');
const addMestoButton = document.querySelector('.profile__add-button');
const popupCancelButtonEdit = document.querySelector('.popup__cancel-button_type_edit');
const popupCancelButtonAdd = document.querySelector('.popup__cancel-button_type_add');
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddMesto = document.querySelector('.popup_type_add-mesto');
const elementProfile = document.querySelector('.profile');
const nameInput = document.querySelector('.profile__name');
const jobInput = document.querySelector('.profile__job');
const formElement = document.querySelector('#formEditProfile');

const popupName = formElement.querySelector('.popup__input_type_name');
const popupJob = formElement.querySelector('.popup__input_type_job');
const formAddMesto = document.querySelector('#formAddMesto');
const mestoNameInput = formAddMesto.querySelector('.popup__input_type_mesto');
const imgLinkInput = formAddMesto.querySelector('.popup__input_type_link');

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

function createNewCard(name, link) {
  const copy = template.content.cloneNode(true);
  const titleElement = copy.querySelector('.elements__title');
  const imageElement = copy.querySelector('.elements__image');
  const likeButton = copy.querySelector('.elements__like-button');
  const deleteButton = copy.querySelector('.elements__delete-button');

  titleElement.textContent = name;
  imageElement.src = link;

  likeButton.addEventListener('click', likeButtonActive); // лайк
  function likeButtonActive() {
    likeButton.classList.toggle('elements__like-button_active');
  }

  deleteButton.addEventListener('click', deleteButtonActive); // удаляем через родительский элемент
  function deleteButtonActive() {
    const card = deleteButton.parentElement.parentElement;
    card.remove();
  }

  const imagePopup = document.querySelector('.popup_type_image');
  const imagePopupImage = imagePopup.querySelector('.popup__image');
  const imagePopupTitle = imagePopup.querySelector('.popup__title-bigimage');
  const imagePopupCloseButton = imagePopup.querySelector('.popup__cancel-button_type_image');

  function openImagePopup() {
    imagePopupImage.src = link;
    imagePopupTitle.textContent = name;
    imagePopup.classList.add('popup_opened');
  }

  function closeImagePopup() {
    imagePopup.classList.remove('popup_opened');
  }

  imageElement.addEventListener('click', openImagePopup);
  imagePopupCloseButton.addEventListener('click', closeImagePopup);

  container.prepend(copy);
}

initialCards.forEach((card) => {
  createNewCard(card.name, card.link);
});

function handleFormSubmitMesto(evt) {
  evt.preventDefault();
  const nameValue = mestoNameInput.value;
  const linkValue = imgLinkInput.value;
 
  createNewCard(nameValue, linkValue);
  formAddMesto.reset();
  popupClose();
}

function popupEdit() {
  popupProfile.classList.add('popup_opened');
  popupName.value = nameInput.textContent;
  popupJob.value = jobInput.textContent;
}

function popupOpenMesto() {
  popupAddMesto.classList.add('popup_opened');
}

function popupClose() {
  popupProfile.classList.remove('popup_opened');
  popupAddMesto.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = popupName.value;
  jobInput.textContent = popupJob.value;
  popupClose();
}

addMestoButton.addEventListener('click', popupOpenMesto);
profilEditButton.addEventListener('click', popupEdit);
popupCancelButtonEdit.addEventListener('click', popupClose);
popupCancelButtonAdd.addEventListener('click', popupClose);
formElement.addEventListener('submit', handleFormSubmit);
formAddMesto.addEventListener('submit', handleFormSubmitMesto);