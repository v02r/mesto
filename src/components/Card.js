export default class Card {
  constructor(name, link, alt, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._templateSelector = templateSelector;
    this._imageElement = null;
    this._handleCardClick = handleCardClick; 
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    return cardTemplate.content.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate().querySelector('.elements__card');
    this._imageElement = this._element.querySelector('.elements__image');
    this._setEventListeners();

    const titleElement = this._element.querySelector('.elements__title');

    titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._alt;

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
    this._handleCardClick(this._name, this._link);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.elements__like-button');
    const deleteButton = this._element.querySelector('.elements__delete-button');

    likeButton.addEventListener('click', () => this.toggleLike());
    deleteButton.addEventListener('click', () => this.deleteCard());
    this._imageElement.addEventListener('click', () => this.openImagePopup());
  }
}
