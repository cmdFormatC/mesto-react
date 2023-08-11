import React from 'react'
import api from '../utils/Api'
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    // console.log(cards)
    return (
    <main className="main">
        <section className="profile">
            <div style={{ backgroundImage: `url(${currentUser.avatar})` }} className="profile__avatar-container">
                <button onClick={props.onEditAvatar} className="profile__avatar-edit" />
            </div>
            <div className="profile__info">
                <h1 className="profile__name">{currentUser.name}</h1>
                <h2 className="profile__description">{currentUser.about}</h2>
                <button type="button" onClick={props.onEditProfile} className="profile__edit-button" />
            </div>
            <button type="button" onClick={props.onAddPlace} className="profile__add-button" />
        </section>
        <section className="elements">
            {props.cards.map((item) => {
                return (
                    <Card 
                        card={item}
                        key={item._id}
                        onCardClick = {props.onCardClick}
                        onCardLike = {props.onCardLike}
                        onCardDelete = {props.onCardDelete}
                    />
                )
            })}
        </section>
    </main>
    )
}


