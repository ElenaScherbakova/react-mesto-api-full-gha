import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

export const AddNewCardPopup = ({ closeAllPopups, isOpen, onUpdate }) => {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleLinkChange = (e) => {
        setLink(e.target.value)
    }

    const onSubmit = () => {
        onUpdate({ name, link })
    }

    return <PopupWithForm submitButtonTitle={'Создать'}
      name='card-form'
      idForm='place-form'
      className='popup_type_plus'
      title='Новое место'
      isOpen={isOpen}
      onSubmit={onSubmit}
      onClose={closeAllPopups }
    >
        <input id="title"
               placeholder="Название"
               name="name"
               value={name}
               onChange={handleNameChange}
               className="popup__input popup__name" required minLength="2" maxLength="30"/>
        <span className="popup__error input-error-name"></span>
        <input id="link"
               placeholder="Ссылка на картинку"
               name="link"
               value={link}
               onChange={handleLinkChange}
               type="url"
               className="popup__input popup__link" required />
        <span className="popup__error input-error-link"></span>
    </PopupWithForm>

}