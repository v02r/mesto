export default class Card {
  constructor(data, templateSelector, handleCardClick, api) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    return cardTemplate.content.querySelector('.elements__card').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.elements__image');
    this._setEventListeners();

    const titleElement = this._element.querySelector('.elements__title');
    const likeButton = this._element.querySelector('.elements__like-button');

    titleElement.textContent = this._data.name;
    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.alt;

    if (this._data.own) {
      this._element.querySelector('.elements__delete-button').classList.add('elements__delete-button_visible');
    }

    if (this._data.likes.some(like => like._id === this._data.userId)) {
      likeButton.classList.add('elements__like-button_active');
    }

    likeButton.textContent = this._data.likes.length;

    return this._element;
  }

  toggleLike() {
    if (this._element.querySelector('.elements__like-button').classList.contains('elements__like-button_active')) {
      this._api.removeLike(this._data._id)
        .then((data) => {
          this._element.querySelector('.elements__like-button').textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      this._api.addLike(this._data._id)
        .then((data) => {
          this._element.querySelector('.elements__like-button').textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
  }

  deleteCard() {
    this._api.deleteCard(this._data._id)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  openImagePopup() {
    this._handleCardClick(this._data.name, this._data.link);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.elements__like-button');
    const deleteButton = this._element.querySelector('.elements__delete-button');

    likeButton.addEventListener('click', () => this.toggleLike());

    if (deleteButton) {
      deleteButton.addEventListener('click', () => this.deleteCard());
    }

    this._imageElement.addEventListener('click', () => this.openImagePopup());
  }
}
