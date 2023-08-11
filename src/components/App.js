import '../index';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react'
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then((result) => {
      setCurrentUser(result)
      api.getInitialCards()
            .then((result) => {
                const cardsArr = result.map((item) => {
                    return {
                        name: item["name"],
                        link: item["link"],
                        likes: item["likes"],
                        ownerId: item["owner"]._id,
                        _id: item["_id"]
                    }
                });
                setCards(cardsArr);
        })
        .catch((error) => {
            console.error(error); 
        })
    })
  }, [])

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.togglelike(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => {
      console.error(error); 
  });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(cards.filter(item => item._id !== card._id));
    })
    .catch((error) => {
      console.error(error); 
    })
  }

  function handleUpdateUser(inputValues) {
    api.editProfile({
      name: inputValues.name,
      about: inputValues.about
    })
    .then((res) =>{
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => {
      console.error(error); 
  });
  }

  function handleUpdateAvatar(newAvatar) {
    api.updateAvatar(newAvatar)
    .then((res) =>{
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => {
      console.error(error); 
  });
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
    .then((res) =>{
      setCards([{
        name: res["name"],
        link: res["link"],
        likes: res["likes"],
        ownerId: res["owner"]._id,
        _id: res["_id"]
    }, ...cards]);
    closeAllPopups();
    })
    .catch((error) => {
      console.error(error); 
  });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          onCardClick = {handleCardClick}
          onCardLike = {handleCardLike}
          onCardDelete = {handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup  
          isOpen={isEditProfilePopupOpen}
          onClose = {closeAllPopups} 
          onUpdateUser = {handleUpdateUser}
        />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup 
          name="zoom-image"
          onClose = {closeAllPopups}
          card = {selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
