import successImg from '../images/success.svg';
import failImg from '../images/fail.svg';

function InfoTooltip({ isResponseFail, isOpen, onClose }) {
  const srcImg = isResponseFail ? failImg : successImg;
  const title = isResponseFail
    ? 'Что-то пошло не так! Попробуйте ещё раз.'
    : 'Вы успешно зарегистрировались!';
  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-btn btn-hover"
        />
        <img
          className="popup__result-img"
          src={srcImg}
          alt="Результат запроса"
        />
        <p className="popup__title">{title}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
