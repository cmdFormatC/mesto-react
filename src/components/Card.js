import React from 'react'
export default function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    return (
        <div className="element">
            <button type="button" className="element__delete-button"></button>
            <div className="element__image" onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }} />
            <div className="element__description">
                <h3 className="element__title">{props.card.name}</h3>
                <div className="element__like">
                    <button type="button" className="element__like-button"></button>
                    <span className="element__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}
