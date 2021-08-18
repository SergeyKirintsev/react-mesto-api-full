import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState({
    name: '',
    link: '',
  });

  const handleChange = (evt) => {
    setPlace((state) => ({
      ...state,
      [evt.target.name]: evt.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlaceSubmit(place);
  }

  React.useEffect(() => {
    setPlace({
      name: '',
      link: '',
    });
  }, [props.isOpen]);

  return (
    <PopupWithForm
      {...props}
      type={'add_card'}
      title={'Новое место'}
      submitBtnCaption={'Создать'}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          onChange={handleChange}
          value={place.name || ''}
          id="card-name"
          type="text"
          name="name"
          className="popup__input popup__input_type_img-name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          aria-label="Имя"
        />
        <span className="popup__input-error card-name-error"></span>
      </section>
      <section className="popup__section">
        <input
          onChange={handleChange}
          value={place.link || ''}
          id="card-link"
          type="url"
          name="link"
          className="popup__input popup__input_type_img-link"
          placeholder="Ссылка на картинку"
          required
          aria-label="Ссылка на картинку"
        />
        <span className="popup__input-error card-link-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
