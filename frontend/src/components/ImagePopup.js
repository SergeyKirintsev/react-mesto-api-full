function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_img_view ${card ? 'popup_is-opened' : ''}`}>
      <div className="popup__img-wrapper">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-btn btn-hover"
        />
        <figure className="popup__figure">
          <img className="popup__image" src={card?.link} alt={card?.name} />
          <figcaption className="popup__caption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
