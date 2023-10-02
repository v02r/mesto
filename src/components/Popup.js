export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    if (this._popup) {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
  }

  close() {
    if (this._popup) {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    if (this._popup) {
      const closeButton = this._popup.querySelector('.popup__cancel-button');
      closeButton.addEventListener('click', () => {
        this.close();
      });

      this._popup.addEventListener('click', (evt) => {
        if (evt.target === this._popup) {
          this.close();
        }
      });
    }
  }
}
