const profilEditButton = document.querySelector('.profile__edit-button');
const addMestoButton = document.querySelector('.profile__add-button');
const popupCancelButtonEdit = document.querySelector('.popup__cancel-button_type_edit');
const popupCancelButtonAdd = document.querySelector('.popup__cancel-button_type_add');
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddMesto = document.querySelector('.popup_type_add-mesto')
const elementProfile = document.querySelector('.profile');
const nameInput = document.querySelector ('.profile__name');
const jobInput = document.querySelector ('.profile__job');
const formElement = document.querySelector('.popup__form');
const popupName = formElement.querySelector('.popup__input_type_name');
const popupJob = formElement.querySelector('.popup__input_type_job');

function popupEdit() {
  popupProfile.classList.add ('popup_opened');
  popupName.value = nameInput.textContent;
  popupJob.value = jobInput.textContent;
  };
  
function popupOpenMesto() {
  popupAddMesto.classList.add ('popup_opened');

}


function popupClose() {
  popupProfile.classList.remove ('popup_opened');
  popupAddMesto.classList.remove ('popup_opened');

  };

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    nameInput.textContent=popupName.value;
    jobInput.textContent=popupJob.value;
    popupClose();

}

addMestoButton.addEventListener('click', popupOpenMesto);
profilEditButton.addEventListener('click', popupEdit);
popupCancelButtonEdit.addEventListener('click', popupClose);
popupCancelButtonAdd.addEventListener('click', popupClose);
formElement.addEventListener('submit', handleFormSubmit);