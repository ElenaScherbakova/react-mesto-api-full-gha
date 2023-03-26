import profilePencilSvg from "../images/pencil.svg";
import {useContext, useEffect, useState} from "react";
import API from "../utils/api";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main ({ onEditProfile,
                   onAddPlace,
                   onEditAvatar,
                   onCardClick,
                   onCardLike,
                   onCardRemove,
                   cards = []}) {

    const { name, about, avatar } = useContext(CurrentUserContext)

    return (
        <main className="content">

            {/* profile */}
            <section className="profile">

                <div className="profile__image-container" onClick={onEditAvatar}>
                    <img alt="Фото пользователя"
                         className="profile__image"
                         src={avatar}
                         />
                    <div className="profile__pencil"></div>
                </div>
                <div className="profile__info">
                    <div className="profile__header-line">
                        <h1 className="profile__title">{name}</h1>
                        <button type="button"
                                className="profile__edit" onClick={onEditProfile}>
                            <img src={profilePencilSvg}
                                 alt="Редактировать" />
                        </button>
                    </div>
                    <p className="profile__subtitle">{about}</p>
                </div>
                <button type="button"
                        className="profile__plus"
                        onClick={onAddPlace}>
                </button>

            </section>

            {/* elements  */}

            <section className="elements">
                {/* отображение массива карточек */}
                { cards.map( card =>
                    <Card key={card._id} card={card}
                          onCardClick={onCardClick}
                          onCardLike={ () => onCardLike(card) }
                          onCardRemove={() => onCardRemove(card) }
                    /> )
                }
            </section>

        </main>
    );
}

export default Main;