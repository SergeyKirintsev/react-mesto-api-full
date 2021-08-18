import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      {...props}
      type={'edit_profile'}
      title={'Редактировать профиль'}
      submitBtnCaption={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          onChange={handleChangeName}
          id="name-profile"
          type="text"
          name="name"
          className="popup__input popup__input_type_name"
          value={name || ''}
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          aria-label="Имя"
        />
        <span className="popup__input-error name-profile-error" />
      </section>
      <section className="popup__section">
        <input
          onChange={handleChangeDescription}
          id="job-profile"
          type="text"
          name="about"
          className="popup__input popup__input_type_job"
          value={description || ''}
          placeholder="Увлечение/работа"
          required
          minLength="2"
          maxLength="200"
          aria-label="О себе"
        />
        <span className="popup__input-error job-profile-error" />
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
