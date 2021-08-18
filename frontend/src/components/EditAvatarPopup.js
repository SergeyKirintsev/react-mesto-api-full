import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarLink = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  }

  return (
    <PopupWithForm
      {...props}
      type={'avatar'}
      title={'Обновить аватар'}
      submitBtnCaption={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          ref={avatarLink}
          id="avatar-link"
          type="url"
          name="avatar"
          className="popup__input"
          placeholder="Ссылка на аватар"
          required
          aria-label="Ссылка на аватар"
        />
        <span className="popup__input-error avatar-link-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
