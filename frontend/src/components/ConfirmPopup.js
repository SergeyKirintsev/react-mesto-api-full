import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onConfirmDeleteCard();
  }

  return (
    <PopupWithForm
      {...props}
      type={'confirm'}
      title={'Вы уверены?'}
      submitBtnCaption={'Да'}
      submitBtnCaptionIsLoading={'Удаление...'}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmPopup;
