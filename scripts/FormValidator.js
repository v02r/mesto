class FormValidator {
    constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
    }
  
    _showInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = '';
    }
  
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _toggleButtonState() {
      const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
      const isValid = this._formElement.checkValidity();
      if (isValid) {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove(this._config.disabledButtonClass);
      } else {
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add(this._config.disabledButtonClass);
      }
    }
  
    _setEventListeners() {
      const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    }
  
    enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
      this._toggleButtonState();
    }
  }
  
  export default FormValidator;
  