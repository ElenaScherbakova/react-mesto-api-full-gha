import React from "react";
import error from '../images/error.svg'
import confirmation from '../images/confirmation.svg'


const InfoTooltip = (props) => {
    const {status, isOpen, closeAllPopups} = props;
    const text = status === 'confirmation'
        ? 'Вы успешно зарегистрировались!'
        : 'Что-то пошло не так! Попробуйте ещё раз.';
    const icon = status === 'confirmation'
        ? confirmation
        : error;

    return (
        <div className={`popup popup_type_infotool ${isOpen ? 'popup_opened' : ''}`}>

            <div className="popup__container">
                <div className="popup__infobox">
                    <button type="button"
                            className="popup__close popup__close_infotool"
                            onClick={closeAllPopups}
                    ></button>
                    <img src={icon}
                         alt={status}
                         className="popup__infotool_icon"/>
                    <p className="popup__infotool_text">{text}</p>
                </div>

            </div>

        </div>

    )

}

export default InfoTooltip