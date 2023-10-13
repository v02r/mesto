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
} from '../utils/constants.js';

const formValidatorEditProfile = new FormValidator(config, formEditProfile);
const formValidatorAddMesto = new FormValidator(config, formAddMesto);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
    headers: {
        authorization: 'e7ff8be3-ef39-402f-a4c6-7e1a28df428f',
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

    userInfo.setUserInfo({ name, about });
    popupProfileForm.close();
});

const popupAddMestoForm = new PopupWithForm('.popup_type_add-mesto', (formData) => {
    const name = formData['place-name'];
    const link = formData['img-link'];
    const alt = formData['img-alt'];

    api.addCard(name, link, alt)
        .then((cardData) => {
            const cardElement = createCard(cardData);
            cardsSection.addItem(cardElement);
            popupAddMestoForm.close();
        })
        .catch((err) => {
            console.error(err);
        });
});

const popupImage = new PopupWithImage('.popup_type_image');

function createCard(cardData) {
    const card = new Card(
        cardData,
        '#template-element',
        handleCardClick,
        handleDeleteCardClick,
        handleLikeClick,
        api
    );
    return card.generateCard();
}

function handleCardClick(name, link) {
    popupImage.open(name, link);
}

function handleDeleteCardClick(card) {
    const cardId = card.getId();

    api.deleteCard(cardId)
        .then(() => {
            cardsSection.removeItem(card);
        })
        .catch((err) => {
            console.error(err);
        });
}

function handleLikeClick(card) {
    const cardId = card.getId();

    if (card.isLiked()) {
        api.removeLike(cardId)
            .then((data) => {
                card.updateLikes(data.likes);
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        api.addLike(cardId)
            .then((data) => {
                card.updateLikes(data.likes);
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

function openEditProfilePopup() {
    const { name, about } = userInfo.getUserInfo();
    inputName.value = name;
    inputJob.value = about;

    popupProfileForm.open();
}

function openAddMestoPopup() {
    formValidatorAddMesto.resetValidation();
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
        cardsSection.renderItems(initialCardsData);
    })
    .catch((err) => {
        console.error(err);
    });

addMestoButton.addEventListener('click', openAddMestoPopup);
profileEditButton.addEventListener('click', openEditProfilePopup);

formValidatorEditProfile.enableValidation();
formValidatorAddMesto.enableValidation();

popupProfileForm.setEventListeners();
popupAddMestoForm.setEventListeners();
popupImage.setEventListeners();
