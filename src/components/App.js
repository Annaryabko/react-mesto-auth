import React, { useState } from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';


function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);


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

  return (
  <div className="page">
    <ImagePopup 
      card={selectedCard} 
      isOpen={!!selectedCard} 
      onClose={closeAllPopups}
    />
    <PopupWithForm
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      name="popup_edit"
      title="Редактировать профиль"
      buttonValue="Сохранить">
          <input className="popup__input popup__input_type_name" type="text" id="name-input" name="name" placeholder="Имя"  minlength="2" maxlength="40" required/>
          <span className="popup__input-error name-input-error"></span>
          <input className="popup__input popup__input_type_description" type="text" id="description-input" name="about" placeholder="Род занятий"  minlength="2" maxlength="200" required/>
          <span className="popup__input-error description-input-error"></span>
    </PopupWithForm>

    <PopupWithForm
        isOpen={false}
        onClose={closeAllPopups}
        name="popup_confirm"
        title="Вы уверены?"
        buttonValue="Да">
    </PopupWithForm>

    <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="popup_avatar"
        title="Обновить аватар?"
        buttonValue="Сохранить">
          <input className="popup__input popup__input_type_link" type="url" id="avatar-input" name="avatar" placeholder="Ссылка на картинку" required/>
          <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>

    <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="popup_add"
        title="Новое место"
        buttonValue="Сохранить">
          <input className="popup__input popup__input_type_title" type="text" id="title-input" name="name" placeholder="Название"  minlength="2" maxlength="30" required/>
          <span className="popup__input-error title-input-error"></span>

          <input className="popup__input popup__input_type_link" type="url" id="link-input" name="link" placeholder="Ссылка на картинку" required/>
          <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>

    <Header />
    <Main 
      onEditProfile={editProfile} 
      onAddPlace={addPlace}
      onEditAvatar={editAvatar}
      onCardClick={handleCardClick}
    />
    <Footer />
  </div>
  );
}

export default App;