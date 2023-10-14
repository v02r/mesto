export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteCard, ownerId, handleLike, handleUnlike) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    // this._api = api;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this._handleUnlike = handleUnlike;
    this._ownerId = ownerId;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    return cardTemplate.content.querySelector('.elements__card').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.elements__image');

    const titleElement = this._element.querySelector('.elements__title');
    this._likeButton = this._element.querySelector('.elements__like-button');

    titleElement.textContent = this._data.name;
    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.alt;
    this._deleteButton = this._element.querySelector('.elements__delete-button')

    this._likesNumberSpan = this._element.querySelector('.elements__like-number');

    if (this._data.owner._id !== this._ownerId) {
      this._deleteButton.classList.remove('elements__delete-button_visible');
    }
    else {
      this._deleteButton.classList.add('elements__delete-button_visible');
    }

    this.toggleLikeActiveState()

    this._likesNumberSpan.textContent = this._data.likes.length;
    this._setEventListeners();

    return this._element;
  }

  toggleLikeActiveState() {
    if (this.ownLike()) {
      this._likeButton.classList.add('elements__like-button_active');
    }
    else {
      this._likeButton.classList.remove('elements__like-button_active');
    }
  }

  ownLike() {
    return this._data.likes.some(like => {
      return like._id === this._ownerId;
    });
  }

  renderLikes() {
    this._likesNumberSpan.textContent = this._data.likes.length;
    this.toggleLikeActiveState();
  }

  setLikes(likes) {
    this._data.likes = likes;
  }

  deleteCard() {
    this._handleDeleteCard(this);
  }

  openImagePopup() {
    this._handleCardClick(this._data.name, this._data.link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this.ownLike()) {
        this._handleUnlike(this._data._id)
      } else {
        this._handleLike(this._data._id)
      }
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () => this.deleteCard());
    }

    this._imageElement.addEventListener('click', () => this.openImagePopup());
  }

  removeCard() {
    this._element.remove();
  }
}
