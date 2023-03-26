import Header from './Header';
import Main from './Main';
import {useEffect, useState} from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddNewCardPopup} from "./AddNewCardPopup";
import Login from './Login.js';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./Register";
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from "./InfoTooltip";

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const [isPopupInfotoolOpen, setPopupInfotoolOpen] = useState(false)
    const [messageStatus, setMessageStatus] = useState(null)

    const onLogin = () => {
        const token = localStorage.getItem('token')
        setLoggedIn(token?.length > 0)
    }

    const onFail = () => {
        openPopupInfotool('error')
    }

    const onRegister = () => {
        openPopupInfotool('confirmation')
    }

    const handleLogout = () => {
        setLoggedIn(false)
        setCurrentUser({})
    }
    const getCards = () => {
        request(api.getInitialCards())
            .then(setCards) // получили карточки с api
            .catch((e) => {
                console.error(e)
            })
    }

    const request = (func) => {
        return func.catch( (e) => {
            if (e == 401) {
                setCurrentUser({})
            }
            throw e
        })
    }

    useEffect( () => {
        onLogin()
    }, [])
    useEffect(() => {
        if (loggedIn) {
            request(api.getUser())
                .then((user) => {
                    setCurrentUser(user)
                }) // получили данные пользователя
                .catch((e) => {
                    console.error(e)
                })
            getCards()
        }
    }, [loggedIn])

    const handleCardLike = (card) => {
        const isLiked = card.likes.indexOf(currentUser._id) >= 0

        request(api.likeCard(card._id, !isLiked))
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const handleCardRemove = (card) => {
        request(api.removeCard(card._id))
            .then(getCards)
            .catch(e => console.error(e))
    }

    const openEditPopup = () => {
        setEditProfilePopupOpen(true)
    };

    const openPopupPlace = () => {
        setAddPlacePopupOpen(true)
    };

    const openAvatarChange = () => {
        setEditAvatarPopupOpen(true)
    }

    const openPopupInfotool = (type) => {
        setPopupInfotoolOpen(true)
        setMessageStatus(type)
    }

    {/* закртие попапа*/
    }
    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false)
        setAddPlacePopupOpen(false)
        setEditProfilePopupOpen(false)
        setSelectedCard(null)
        setPopupInfotoolOpen(false)
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const handleUserUpdate = ({name, about}) => {
        api.updateUser(name, about)
            .then(updatedUser => setCurrentUser(updatedUser))
            .catch(e => console.error(e))
            .finally(() => closeAllPopups())
    }
    const handleAvatarChange = (url) => {
        api.changeAvatar(url)
            .then(updatedUser => setCurrentUser(updatedUser))
            .catch(e => console.error(e))
            .finally(() => closeAllPopups())

    }

    const handleAddNewCard = ({name, link}) => {
        api.createNewCard(name, link)
            .then(card => {
                setCards([card, ...cards])
            })
            .catch(e => console.error(e))
            .finally(() => closeAllPopups())
    }

    return <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <BrowserRouter>
                <Header loggedIn={loggedIn} onSignOut={handleLogout}/>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRouteElement>
                            <Main cards={cards}
                                  onEditProfile={openEditPopup}
                                  onAddPlace={openPopupPlace}
                                  onEditAvatar={openAvatarChange}
                                  onCardClick={handleCardClick}
                                  onCardLike={handleCardLike}
                                  onCardRemove={handleCardRemove}/>
                        </ProtectedRouteElement>
                      }
                    />

                    <Route path="/signup" element={<Register onRegister={onRegister} onFail={onFail}/>}/>
                    <Route path="/signin" element={<Login onLogin={onLogin} onFail={onFail}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
        <EditProfilePopup closeAllPopups={closeAllPopups}
                          isOpen={isEditProfilePopupOpen}
                          onUpdate={handleUserUpdate}
        />
        <EditAvatarPopup closeAllPopups={closeAllPopups}
                         isOpen={isEditAvatarPopupOpen}
                         onUpdate={handleAvatarChange}
        />
        <AddNewCardPopup closeAllPopups={closeAllPopups}
                         isOpen={isAddPlacePopupOpen}
                         onUpdate={handleAddNewCard}
        />

        <InfoTooltip status={messageStatus}
                     isOpen={isPopupInfotoolOpen}
                     closeAllPopups={closeAllPopups}

        />

        {selectedCard && <ImagePopup card={selectedCard}
                                     onClose={closeAllPopups}/>}

    </CurrentUserContext.Provider>

}


export default App;
