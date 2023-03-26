import {useEffect} from "react";

function PopupWithForm({title, className, idForm, name, children, isOpen, onClose, submitButtonTitle, onSubmit }) {
    const handleEscClose = (event) => {
        if (event.key === 'Escape') {
            onClose()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(e)
    }
    const closePopupByOverlay = (event) => {
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__block')) {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscClose);
        document.addEventListener('mousedown', closePopupByOverlay);
        return () => {
            document.removeEventListener('keydown', handleEscClose);
            document.removeEventListener('mousedown', closePopupByOverlay);
        }
    },[isOpen])


    return (
        <div className={`popup ${className} ${isOpen ? 'popup_opened' : 'popup_hidden'}`}>
            <div className="popup__container">
                <button type="button"
                        className="popup__close popup__close_edit" onClick={onClose}></button>
                <h3 className="popup__title">{title}</h3>
                <form id={idForm}
                      name={name}
                      onSubmit={handleSubmit}
                      className="popup__form" noValidate>
                    {children}
                    <button className="popup__button popup__button_edit"
                            type="submit">{submitButtonTitle}
                    </button>
                </form>
            </div>

        </div>
    );
}

export default PopupWithForm;