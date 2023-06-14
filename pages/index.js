let profilEditButton = document.querySelector('.profile__edit-button');
let popupCancelButton = document.querySelector('.popup__cancel-button');
let popupProfile = document.querySelector('.popup');
let elementProfile = document.querySelector('.profile');
let formElement = document.querySelector('.popup__form');

function handeleClick(event) {
  console.log(event.target);
  console.log(event.currentTarget);
  if (event.target === event.currentTarget) {
  popupProfile.classList.toggle('popup_opened');
  }
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    let nameInput = formElement.querySelector('.popup__input_name');
    let jobInput = formElement.querySelector('.popup__input_job');

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    let name = document.querySelector('.profile__name');
    let job = document.querySelector('.profile__job');

    name.textContent = nameInputValue;
    job.textContent = jobInputValue;
}

profilEditButton.addEventListener('click', handeleClick);
popupCancelButton.addEventListener('click', handeleClick);
popupProfile.addEventListener('click', handeleClick);
formElement.addEventListener('submit', handleFormSubmit);