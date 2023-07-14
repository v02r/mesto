function enableSubmitButton(submitButton) {
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove('popup__end-button_disabled');
}

function disableSubmitButton(submitButton) {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup__end-button_disabled');
}

function enableValidation() {
  const forms = document.querySelectorAll('.popup__form');
  forms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('input', handleFormInput);
    toggleSubmitButtonState(form);
  });
}

function handleFormSubmit(evt) {
  evt.preventDefault();
}

function handleFormInput(evt) {
  const form = evt.target.closest('.popup__form');
  const input = evt.target;
  const error = form.querySelector(`#error-${input.name}`);

  if (!input.validity.valid) {
    showInputError(input, error);
  } else {
    hideInputError(input, error);
  }

  toggleSubmitButtonState(form);
}

function showInputError(input, error) {
  input.classList.add('popup__input_type_error');
  error.textContent = input.validationMessage;
  error.classList.add('error-message_visible');
}

function hideInputError(input, error) {
  input.classList.remove('popup__input_type_error');
  error.textContent = '';
  error.classList.remove('error-message_visible');
}

function toggleSubmitButtonState(form) {
  const submitButton = form.querySelector('.popup__end-button');
  if (form.checkValidity()) {
    enableSubmitButton(submitButton);
  } else {
    disableSubmitButton(submitButton);
  }
}

enableValidation();