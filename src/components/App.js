import '../index';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react'
import ImagePopup from './ImagePopup';
function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

  function handleCardClick (card) {
    setSelectedCard(card);
  };

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick () {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''});
  };

  return (
    <div className="root">
      <Header />
      <Main
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
      />
      <Footer />
      <PopupWithForm 
        name="edit-profile" 
        isOpen={isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        submitButtonText = "Cохранить">
          <h2 className="popup__title">Редактировать профиль</h2>
          <input id="input-profile-name" name="profileName" type="text" minLength="2" maxLength="40" placeholder="Имя" className="popup__input popup__input_profile_name" required />
          <span className="input-profile-name-error popup__error" />
          <input id="input-profile-description" name="profileDescription" type="text" minLength="2" maxLength="200" placeholder="О себе" className="popup__input popup__input_profile_description" required />
          <span className="input-profile-description-error popup__error" />
      </PopupWithForm>
      <PopupWithForm 
        name="add-card" 
        isOpen={isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        submitButtonText = "Создать">
          <h2 className="popup__title">Новое место</h2>
            <input id="input-card-name" name="name" type="text" minLength="2" maxLength="30" placeholder="Название" className="popup__input popup__input_card_name" required />
            <span className="input-card-name-error popup__error" />
            <input id="input-card-url" name="link" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_card_url" required />
            <span className="input-card-url-error popup__error" />
      </PopupWithForm>
      <PopupWithForm 
        name="update-avatar" 
        isOpen={isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        submitButtonText = "Cохранить">
          <h2 className="popup__title">Обновить аватар</h2>
            <input id="input-avatar-url" name="link" type="url" placeholder="Ссылка на аватар" className="popup__input popup__input_card_url" required />
            <span className="input-avatar-url-error popup__error" />
      </PopupWithForm>
      <ImagePopup 
        name="zoom-image"
        onClose = {closeAllPopups}
        card = {selectedCard}
      />
    </div>
  );
}

export default App;
