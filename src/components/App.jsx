
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx"
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState } from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopup(false)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }


  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }


  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopup(true)
  }


  return (
    <div className="page__content">

      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__info">
          <input
            className="popup__input popup__input_type_name"
            id="username"
            name="username"
            type="text"
            placeholder="Введите имя"
            minLength={2}
            maxLength={40}
            required=""
          />
          <span
            className="popup__error popup__error_type_username"
            id="name-error"
          />
          <input
            className="popup__input popup__input_type_job"
            id="job"
            name="job"
            type="text"
            placeholder="Введите область деятельности"
            minLength={2}
            maxLength={200}
            required=""
          />
          <span className="popup__error popup__error_type_job" id="job-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="cards"
        title="Новое место"
        titleButton="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__info">
          <input
            className="popup__input popup__input_type_title"
            id="title"
            name="title"
            type="text"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required=""
          />
          <span
            className="popup__error popup__error_type_title"
            id="title-error"
          />
          <input
            className="popup__input popup__input_type_link"
            id="link"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span
            className="popup__error popup__error_type_link"
            id="card-link-error"
          />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="editAvatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__info">
          <input
            className="popup__input popup__input_type_link"
            id="avatar"
            name="avatar"
            type="url"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span
            className="popup__error popup__error_type_avatar"
            id="avatar-link-error"
          />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        titleButton="Да"
      />

      <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups} />

    </div>
  );
}

export default App;
