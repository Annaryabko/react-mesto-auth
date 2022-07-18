import React, { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import avatarPath from '../images/profile-avatar.jpg';
import Card from './Card.js';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  console.log('Main:render');

  function editProfile() {
    onEditProfile();
  };

  function addPlace() {
    onAddPlace();
  };

  function editAvatar() {
    onEditAvatar();
  }

  const [userAvatar, setUserAvatar] = useState(avatarPath);
  const [userName, setUserName] = useState("Жак-Ив Кусто");
  const [userDescription, setUserDescription] = useState("Исследователь океана");

  useEffect(() => {
    api.getUser()
    .then(data => {
      setUserAvatar(data.avatar);
      setUserName(data.name);
      setUserDescription(data.about);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (cards.length > 0) { return; }
    api.getInitialCards()
    .then(data => {
      console.log('data', data);
      setCards(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
      <section className="profile">
      <div className="profile__avatar-wrapper">
        <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
        <div className="profile__avatar-edit" onClick={editAvatar}></div>
      </div>
      <div className="profile__info">
          <h1 className="profile__header">{userName}</h1><div className="profile__edit-wrapper"><button className="profile__edit-button" type="button" value="Отредактировать" onClick={editProfile}></button></div>
        <p className="profile__title">{userDescription}</p>
      </div>
      <button className="profile__add-button" type="button" value="Добавить" onClick={addPlace}>+</button>
      </section>
      <section className="elements">
        <ul className="elements__items">
            {
              cards.map((card) => {
                return (
                  <Card
                    key={card._id}
                    card={card}
                    onCardClick={onCardClick}
                      >
                  </Card>
                )
              })
            }

        </ul>
      </section>

    </>
  );
}

export default Main;