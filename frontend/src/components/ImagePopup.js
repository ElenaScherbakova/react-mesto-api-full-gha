function ImagePopup({card, onClose}) {
    return <div className="popup popup_type_image popup_opened">

        <div className="popup__unit">
            <div className="popup__block"></div>
            <figure className="popup__figure">
                <img src={card.link}
                     alt={card.name}
                     className="popup__photo" />
                    <figcaption>
                        <p className="popup__figcaption"></p>
                    </figcaption>
                    <button type="button"
                            className="popup__close popup__close_photo"
                            onClick={onClose}
                    ></button>
            </figure>
        </div>
    </div>

}

export default ImagePopup;