import React, { useState, useEffect } from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUser()
      .then(data => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [currentUser._id])

  useEffect(() => {
    if (cards.length > 0) { return; }
    api.getInitialCards()
    .then(data => {
      setCards(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [cards])


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      handleCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      handleCards((state) => state.filter((c) => c._id === !card._id));
    });
  }
  
  function editProfile() {
    setisEditProfilePopupOpen(true);  
  };

  function addPlace() {
    setisAddPlacePopupOpen(true);
  };

  function editAvatar() {
    setisEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  function handleUpdateUser(data) {
    api.editName(data)
    .then(data => {
      setCurrentUser(data);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
    .then(data => {
      setCurrentUser(data);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCards(data) {
    setCards(data);
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <ImagePopup 
        card={selectedCard} 
        isOpen={!!selectedCard} 
        onClose={closeAllPopups}
      />

      {/* <PopupWithForm
          isOpen={false}
          onClose={closeAllPopups}
          name="popup_confirm"
          title="Вы уверены?"
          buttonValue="Да">
      </PopupWithForm> */}

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateCards={handleAddPlaceSubmit} />

      <Header />
      <Main 
        onEditProfile={editProfile} 
        onAddPlace={addPlace}
        onEditAvatar={editAvatar}
        onCardClick={handleCardClick}
        cards={cards}
        handleCards={handleCards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;