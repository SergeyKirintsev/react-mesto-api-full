import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className="elements__element">
      {isOwn && (
        <button
          onClick={handleDeleteClick}
          type="button"
          aria-label="Удалить"
          className="elements__trash-btn btn-hover"
        />
      )}
      <div className="elements__img-wrap">
        <img onClick={handleClick} src={card.link} alt={card.name} className="elements__img" />
      </div>
      <div className="elements__description">
        <h2 className="elements__text block">{card.name}</h2>
        <div className="elements__like-wrap">
          <button
            onClick={handleLikeClick}
            type="button"
            aria-label="Нравится"
            className={`elements__like-btn btn-hover ${isLiked ? 'elements__like-btn_active' : ''}`}
          />
          <span className="elements__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
