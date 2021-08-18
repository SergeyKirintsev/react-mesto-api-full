'use strict';

const configValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_disabled',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active',
};

const cardsContainerSelector = '.elements__list';
const cardTemplateSelector = '.card-template';
const nameElSelector = '.profile__name';
const jobElSelector = '.profile__profession';
const avatarElSelector = '.profile__avatar';
const viewImagePopupSelector = '.popup_img_view';
const profilePopupSelector = '.popup_edit_profile';
const addCardPopupSelector = '.popup_add_card';
const avatarPopupSelector = '.popup_avatar';
const confirmPopupSelector = '.popup_confirm';

const editProfileBtn = document.querySelector('.profile__edit-btn');
const addCardBtn = document.querySelector('.profile__add-btn');

const profilePopupEl = document.querySelector(profilePopupSelector);
const profileForm = profilePopupEl.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');

const addCardPopup = document.querySelector(addCardPopupSelector);
const addCardForm = addCardPopup.querySelector('.popup__form');

const avatarPopup = document.querySelector(avatarPopupSelector);
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarLogo = document.querySelector('.profile__avatar-wrapper');

const confirmPopup = document.querySelector('.popup_confirm');

export {
  configAPI,
  configValidate,
  editProfileBtn,
  nameInput,
  jobInput,
  avatarElSelector,
  profileForm,
  addCardForm,
  addCardBtn,
  cardsContainerSelector,
  nameElSelector,
  jobElSelector,
  viewImagePopupSelector,
  profilePopupSelector,
  addCardPopupSelector,
  cardTemplateSelector,
  avatarPopupSelector,
  avatarPopup,
  avatarForm,
  avatarLogo,
  confirmPopup,
  confirmPopupSelector,
};
