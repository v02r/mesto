function enableSubmitButton(submitButton, config) {
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove(config.disabledButtonClass);
}

function disableSubmitButton(submitButton, config) {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add(config.disabledButtonClass);
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => handleFormSubmit(evt, config));
    form.addEventListener('input', () => handleFormInput(form, config));
    toggleSubmitButtonState(form, config.submitButtonSelector, config);
  });
}

function handleFormSubmit(evt, config) {
  evt.preventDefault();
}

function handleFormInput(form, config) {
  const input = event.target;
  const error = form.querySelector(`#error-${input.name}`);

  if (!input.validity.valid) {
    showInputError(input, error, config);
  } else {
    hideInputError(input, error, config);
  }

  toggleSubmitButtonState(form, config.submitButtonSelector, config);
}

function showInputError(input, error, config) {
  input.classList.add(config.inputErrorClass);
  error.textContent = input.validationMessage;
  error.classList.add(config.errorClass);
}

function hideInputError(input, error, config) {
  input.classList.remove(config.inputErrorClass);
  error.textContent = '';
  error.classList.remove(config.errorClass);
}

function toggleSubmitButtonState(form, submitButtonSelector, config) {
  const submitButton = form.querySelector(submitButtonSelector);
  if (form.checkValidity()) {
    enableSubmitButton(submitButton, config);
  } else {
    disableSubmitButton(submitButton, config);
  }
}

const config = {
  formSelector: '.popup__form',
  submitButtonSelector: '.popup__end-button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error-message_visible',
  disabledButtonClass: 'popup__end-button_disabled',
};

enableValidation(config);