export default class Card {
  constructor(name, link, alt, templateSelector) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate().querySelector('.elements__card');
    this._setEventListeners();

    const titleElement = this._element.querySelector('.elements__title');
    const imageElement = this._element.querySelector('.elements__image');

    titleElement.textContent = this._name;
    imageElement.src = this._link;
    imageElement.alt = this._alt;

    return this._element;
  }

  toggleLike() {
    const likeButton = this._element.querySelector('.elements__like-button');
    likeButton.classList.toggle('elements__like-button_active');
  }

  deleteCard() {
    this._element.remove();
  }

  openImagePopup() {
    const imagePopup = document.querySelector('.popup_type_image');
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupTitle = imagePopup.querySelector('.popup__title-bigimage');
    imagePopupImage.src = this._link;
    imagePopupImage.alt = this._name;
    imagePopupTitle.textContent = this._name;
    this._openPopup(imagePopup); 
  }

  _closeImagePopup() {
    this._closePopup(document.querySelector('.popup_type_image')); 
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.elements__like-button');
    const deleteButton = this._element.querySelector('.elements__delete-button');
    const imageElement = this._element.querySelector('.elements__image');

    likeButton.addEventListener('click', () => this.toggleLike());
    deleteButton.addEventListener('click', () => this.deleteCard());
    imageElement.addEventListener('click', () => this.openImagePopup());
    const imagePopupCloseButton = document.querySelector('.popup_type_image').querySelector('.popup__cancel-button_type_image');
    imagePopupCloseButton.addEventListener('click', () => this._closeImagePopup());
  }

  _openPopup(popup) {
    popup.classList.add('popup_opened');
  }

  _closePopup(popup) {
    popup.classList.remove('popup_opened');
  }
}