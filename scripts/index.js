let profilEditButton = document.querySelector('.profile__edit-button');
let popupCancelButton = document.querySelector('.popup__cancel-button');
let popupProfile = document.querySelector('.popup');
let elementProfile = document.querySelector('.profile');
let nameInput = document.querySelector ('.profile__name');
let jobInput = document.querySelector ('.profile__job');
let formElement = document.querySelector('.popup__form');
let popupName = formElement.querySelector('.popup__input_type_name');
let popupJob = formElement.querySelector('.popup__input_type_job');

function handeleClick() {
  popupProfile.classList.toggle ('popup_opened');
  popupName.value = nameInput.textContent;
  popupJob.value = jobInput.textContent;
  }

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    popupProfile.classList.toggle ('popup_opened');
    nameInput.textContent=popupName.value;
    jobInput.textContent=popupJob.value;

}

profilEditButton.addEventListener('click', handeleClick);
popupCancelButton.addEventListener('click', handeleClick);
formElement.addEventListener('submit', handleFormSubmit);