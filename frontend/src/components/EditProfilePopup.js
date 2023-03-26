import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export const EditProfilePopup = ({ isOpen, closeAllPopups, onUpdate }) => {
    const { name, about } = useContext(CurrentUserContext)
    const [_name, setName] = useState(name ?? '')
    const [_about, setAbout] = useState(about ?? '')

    useEffect(() => {
        if (isOpen) {
            setAbout(about)
            setName(name)
        }
    }, [name,about,isOpen])
    const onSubmit = () => {
        onUpdate({
            name: _name,
            about: _about
        })
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleAboutChange = (e) => {
        setAbout(e.target.value)
    }

    return <PopupWithForm submitButtonTitle={'Сохранить'}
                   name={'edit-profile-form'}
                   idForm={'submit-form'}
                   className={'popup_type_edit'}
                   title={'Редактировать профиль'}
                   isOpen={isOpen}
                   onSubmit={onSubmit}
                   onClose={closeAllPopups}
    >
        <input id="name"
               placeholder="Имя"
               name="name"
               value={_name}
               onChange={handleNameChange}
               className="popup__input" minLength="2" maxLength="40" required/>
        <label htmlFor="name" className="popup__error input-error-name"></label>
        <input id="avocation"
               placeholder="О себе"
               name="about"
               value={_about}
               onChange={handleAboutChange}
               className="popup__input" minLength="2" maxLength="200" required />
        <label htmlFor="avocation" className="popup__error input-error-about" />
    </PopupWithForm>
}
