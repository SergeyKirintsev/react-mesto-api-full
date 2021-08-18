function PopupWithForm(props) {
  const submitBtnCaptionIsLoading =
    props.submitBtnCaptionIsLoading || 'Сохранение...';
  return (
    <div className={`popup ${props.isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-btn btn-hover"
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          onSubmit={props.onSubmit}
          name={props.type}
          className="popup__form"
          noValidate
        >
          {props.children}

          <button type="submit" className="popup__form-submit btn-hover">
            {props.isLoading
              ? submitBtnCaptionIsLoading
              : props.submitBtnCaption}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
