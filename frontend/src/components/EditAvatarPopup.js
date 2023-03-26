import PopupWithForm from "./PopupWithForm";
import {useContext, useRef} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export const EditAvatarPopup = ({ isOpen, closeAllPopups, onUpdate } ) => {
    const { avatar } = useContext(CurrentUserContext)
    const inputRef = useRef(null)

    const onSubmit = () => {
        if(inputRef.current) {
            onUpdate(inputRef.current.value)
        }
    }


    return <PopupWithForm submitButtonTitle={'Сохранить'}
      name={'card-form'}
      idForm={'avatar-form'}
      className={'popup_type_agreement'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={onSubmit}
    >
        <input id="agreement"
               ref={inputRef}
               placeholder="Ссылка на изображение"
               name="url"
               type="url"
               defaultValue={avatar}
               className="popup__input" required minLength="2" />
        <span className="popup__error input-error-url"></span>
    </PopupWithForm>

}