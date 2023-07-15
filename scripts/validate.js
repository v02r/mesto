function enableSubmitButton(submitButton) {
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove('popup__end-button_disabled');
}

function disableSubmitButton(submitButton) {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup__end-button_disabled');
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => handleFormSubmit(evt, config));
    form.addEventListener('input', () => handleFormInput(form, config));
    toggleSubmitButtonState(form, config.submitButtonSelector);
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

  toggleSubmitButtonState(form, config.submitButtonSelector);
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

function toggleSubmitButtonState(form, submitButtonSelector) {
  const submitButton = form.querySelector(submitButtonSelector);
  if (form.checkValidity()) {
    enableSubmitButton(submitButton);
  } else {
    disableSubmitButton(submitButton);
  }
}

const config = {
  formSelector: '.popup__form',
  submitButtonSelector: '.popup__end-button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error-message_visible',
};

enableValidation(config);