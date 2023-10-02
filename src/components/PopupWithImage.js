import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__title-bigimage');
    this._closeButton = this._popup.querySelector('.popup__cancel-button_type_image');
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._closeButton.addEventListener('click', () => this.close());
  }
}
