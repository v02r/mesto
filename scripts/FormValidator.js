export default class FormValidator {
    constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    }
  
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`#error-${inputElement.name}`);
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#error-${inputElement.name}`);
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._config.errorClass);
    }
  
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _hasInvalidInput() {
      return Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
        .some((inputElement) => !inputElement.validity.valid);
    }
  
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._submitButton.setAttribute('disabled', true);
        this._submitButton.classList.add(this._config.inactiveButtonClass);
      } else {
        this._submitButton.removeAttribute('disabled');
        this._submitButton.classList.remove(this._config.inactiveButtonClass);
      }
    }
  
    _setEventListeners() {
      Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
        .forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
          });
        });
  
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    }
  
    enableValidation() {
      this._setEventListeners();
    }
  }