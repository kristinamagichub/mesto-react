import { useCallback, useEffect, useState } from "react";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";


function App() {
  // states for popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopup, setIsImagePopup] = useState(false)
  const [isDeleteImagePopupOpen, setIsDeleteImagePopupOpen] = useState(false)
  const [deleteCardId, setDeleteCardId] = useState(' ')
  const [selectedCard, setSelectedCard] = useState({})



  // state for context
  const [currentUser, setCurrentUser] = useState({})

  // states for card
  const [cards, setCards] = useState([]) //cards -массив карточек

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLike = card.likes.some(element => currentUser._id === element._id);


    if (isLike) {
      api.deleteLike(card._id)
        .then(res => {
          setCards(state => state.map((c) => c._id === card._id ? res : c));
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`))
    } else {
      api.addLike(card._id)
        .then(res => {
          setCards(state => state.map((c) => c._id === card._id ? res : c));
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }




  // useCallBack позволяет записать в значение константы ссылку на функцию, между рендэрами она меняться не будет, (ф никогда не изменится, потому что есть пустой массив зависимостей)
  // вспомогательная   
  const setStatesForClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopup(false)
    setIsDeleteImagePopupOpen(false)
  }, [])


  const closePopupByEsc = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setStatesForClosePopups()
      document.removeEventListener('keydown', closePopupByEsc)
    }
  }, [setStatesForClosePopups])


  const closeAllPopups = useCallback(() => {
    setStatesForClosePopups()
    document.removeEventListener('keydown', closePopupByEsc)
  }, [setStatesForClosePopups, closePopupByEsc])


  function setEventListener() {
    document.addEventListener('keydown', closePopupByEsc)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListener()
  }


  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEventListener()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    setEventListener()
  }


  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopup(true)
    setEventListener()
  }

  function handleDeleteImagePopupClick(cardId) {
    setDeleteCardId(cardId)
    setIsDeleteImagePopupOpen(true)
    setEventListener()
  }


  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()]) //получает на вход масив из асихронных методов, выполняет их параллельно
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser)
        setCards(dataCards)
      })
      .catch((error) => console.error(`Ошибка при создании начальных данных страницы ${error}`))
  }, [])

  function handleDeleteSubmit(evt) {
    evt.preventDefault()
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }))
        closeAllPopups()
      })
      .catch((err) => console.error(`Ошибка при удалении картинки ${err}`))
  }


  function handleUpdateUser(dataUser, reset) {
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при редактировании профиля ${error}`))
  }


  function handleUpdateAvatar(dataUser, reset) {
    api.setNewAvatar(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`))
  }


  function handleAddPlaceSubmit(dataCard, reset) {
    api.addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()

      })

      .catch((error => console.error(`Ошибка при добавлении картинки ${error}`)))
  }





  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDelete={handleDeleteImagePopupClick}
          cards={cards}
          onCardLike={handleCardLike}
        />

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />


        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={isDeleteImagePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteSubmit}
          isValid
        />

        <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
