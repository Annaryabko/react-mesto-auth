import React from 'react';

function Card({card, onCardClick}) {
  const handleCardClick = () => {
    onCardClick(card);
  }
  return (
      <li className="elements__item">
        <img className="elements__picture" src={card.link} alt="Название" onClick={handleCardClick}/>
        <button className="elements__delete" type="button" value="Удалить"></button>
        <div className="elements__wrapper">
          <h2 className="elements__item-name">{card.name}</h2>
          <div className="elements__like-wrapper">
            <button className="elements__like" type="button" value="Нравится"></button>
            <p className="elements__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
  );
}

export default Card;