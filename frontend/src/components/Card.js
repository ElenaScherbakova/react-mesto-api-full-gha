import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardRemove}) => {

    const { _id } = useContext(CurrentUserContext)
    const currentUserLiked = card.likes.indexOf( _id ) >= 0
    const className = 'card__like' + (currentUserLiked ? ' card__like_active' : '')
    function handleClick () {
        onCardClick(card)
    }

    return (

        <div className="card">
            <div className="card__place">
                <img className="card__photo"
                     src={card.link} onClick={handleClick}/>
                { card.owner === _id &&
                    <button type="button"
                            className="card__basket"
                            onClick={onCardRemove}></button>
                }
            </div>
            <div className="card__title">
                <h2 className="card__text">{card.name}</h2>
                <div className="card__heart">
                    <button type="button"
                            className={className}
                            onClick={onCardLike}
                    >
                    </button>
                    <span className="card__counter">{card.likes.length}</span>
                </div>

            </div>
        </div>

    );
}

export default Card;