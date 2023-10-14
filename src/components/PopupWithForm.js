import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._popupSubmitButton = this._popup.querySelector('.popup__end-button');
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  setLoadingText(text) {
    this._popupSubmitButton.innerText = text;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
