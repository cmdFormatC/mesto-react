import React from 'react';
import ErrorImage from '../images/error.svg';
import SuccessImage from '../images/success.svg';

export default function InfoTooltip(props) {
  return (
    <div className={`popup popup_alert ${props.isOpen  ? 'popup_opened' : ''}`}>
        <figure className="popup__alert-container">
          <button onClick={props.onClose} type="button" className="popup__close-button" />
          <img className="popup__icon" alt='иконка' src={props.success ? SuccessImage : ErrorImage} />
          <figcaption className="popup__alert">
            {props.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </figcaption>
        </figure>
    </div>
  )
}
