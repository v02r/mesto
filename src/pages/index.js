import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../pages/index.css';
import {
    profileEditButton,
    addMestoButton,
    formEditProfile,
    formAddMesto,
    config,
    inputName,
    inputJob,
  avatarEditButtton,
  formAvatar
} from '../utils/constants.js';
import PopupConfirm from "../components/PopupConfirm";

const formValidatorEditProfile = new FormValidator(config, formEditProfile);
const formValidatorAddMesto = new FormValidator(config, formAddMesto);
const formValidatorAvatar = new FormValidator(config, formAvatar);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
    headers: {
        authorization: 'e7ff8be3-ef39-402f-a4c6-7e1a28df428f',
        'Content-Type': 'application/json'
    },
});

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__job',
    avatarSelector: '.profile__avatar-image',
});

const popupProfileForm = new PopupWithForm('.popup_type_edit', (formData) => {
    const name = formData['p-name'];
    const about = formData['p-job'];
    const submitText = "Сохранить";
  popupProfileForm.setLoadingText('Сохранение...');
    api.editUserInfo({name, about}).then((res) => {
      const { name, about } = res;
      userInfo.setUserInfo({ name, about });
      popupProfileForm.close();
      formValidatorEditProfile.disableSubmitButton();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      popupProfileForm.setLoadingText(submitText);
    })
});

const popupAddMestoForm = new PopupWithForm('.popup_type_add-mesto', (formData) => {
    const name = formData['place-name'];
    const link = formData['img-link'];
    const submitText = "Создать";
    popupAddMestoForm.setLoadingText('Создание...');
    api.addCard(name, link)
        .then((cardData) => {
            const cardElement = createCard(cardData);
            cardsSection.addItem(cardElement);
          popupAddMestoForm.close();
          formValidatorAddMesto.disableSubmitButton();
        })
        .catch((err) => {
            console.error(err);
        })
      .finally(() => {
        popupAddMestoForm.setLoadingText(submitText);
      })
});

const popupDeleteCard = new PopupConfirm(
  ".popup_type_delete",
  (element) => {
    const submitText = "Удалить";
    popupDeleteCard.setLoadingText('Удаление...');
    api.deleteCard(element._data._id)
      .then(_ => {
        element.removeCard()
        popupDeleteCard.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupDeleteCard.setLoadingText(submitText);
      })
  }
);

popupDeleteCard.setEventListeners();

const popupImage = new PopupWithImage('.popup_type_image');

function createCard(cardData) {
    const card = new Card(
        cardData,
        '#template-element',
        handleCardClick,
        handleDeleteCardClick,
        userInfo.getUserId(),
      function (id) {
        api.likeCard(id).then(res => {
          card.setLikes(res.likes)
          card.renderLikes(res.likes)
        })
          .catch(err => {
            console.log(err);
          })
      }, function (id) {
        api.unlikeCard(id).then(res => {
          card.setLikes(res.likes)
          card.renderLikes(res.likes)
        })
          .catch(err => {
            console.log(err);
          })
      }
    );
    return card.generateCard();
}

function handleCardClick(name, link) {
    popupImage.open(name, link);
}

function handleDeleteCardClick(card) {
  console.log(card)
  popupDeleteCard.openPopup(card);
}

function openEditProfilePopup() {
    const { name, about } = userInfo.getUserInfo();
    inputName.value = name;
    inputJob.value = about;
    formValidatorEditProfile.clearErrors();
    popupProfileForm.open();
}

const popupAvatar = new PopupWithForm(
  ".popup_type_profile-photo-change",
  (data) => {
    const submitText = "Сохранить";
    popupAvatar.setLoadingText('Cохранение...');
  console.log(data)
    api.editAvatar(data.avatar)
      .then(res => {
        userInfo.setAvatar(res.avatar)
        popupAvatar.close();
        formValidatorAvatar.disableSubmitButton();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.setLoadingText(submitText);
      })
  }
);

popupAvatar.setEventListeners();

function openAvatarPopup() {
  formValidatorAddMesto.clearErrors();
  popupAvatar.open();
}

function openAddMestoPopup() {
    formValidatorAddMesto.clearErrors();
    popupAddMestoForm.open();
}

const cardsSection = new Section({
    renderer: (cardData) => {
        const cardElement = createCard(cardData);
        cardsSection.addItem(cardElement);
    },
}, '.elements');

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfoData, initialCardsData]) => {
        userInfo.setUserInfo(userInfoData);
        cardsSection.renderItems(initialCardsData.reverse());
    })
    .catch((err) => {
        console.error(err);
    });

addMestoButton.addEventListener('click', openAddMestoPopup);
profileEditButton.addEventListener('click', openEditProfilePopup);
avatarEditButtton.addEventListener('click', openAvatarPopup);

formValidatorEditProfile.enableValidation();
formValidatorAddMesto.enableValidation();
formValidatorAvatar.enableValidation();

popupProfileForm.setEventListeners();
popupAddMestoForm.setEventListeners();
popupImage.setEventListeners();
