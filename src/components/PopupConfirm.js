import Popup from "./Popup.js"

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupSubmitButton = this._popup.querySelector('.popup__end-button');
  }

  setLoadingText(text) {
    this._popupSubmitButton.textContent = text;
  }

  getSubmitText() {
    return this._popupSubmitButton.textContent;
  }

  setEventListeners() {
    this._popupSubmitButton.addEventListener('click', e => {
      e.preventDefault();
      this._handleSubmit(this._element);
    })
    super.setEventListeners();
  }

  openPopup(element) {
    this._element= element;
    super.open();
  }
}
