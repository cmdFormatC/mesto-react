import React from 'react'
import api from '../utils/Api'
import Card from './Card';
export default function Main(props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        api.getUserInfo()
        .then((result) => {
            setUserName(result.name);
            setUserDescription(result.about);
            setUserAvatar(result.avatar);
        })
        .then(() => {
            api.getInitialCards()
            .then((result) => {
                const cardsArr = result.map((item) => {
                    return {
                        name: item["name"],
                        link: item["link"],
                        likes: item["likes"],
                        ownerId: item["owner"]._id,
                        cardId: item["_id"]
                    }
                });
                setCards(cardsArr);
            })
            .catch((error) => {
                console.error(error); 
            })
        })
        .catch((error) => {
            console.error(error); 
        })
    }, [])
    // console.log(cards)
    return (
    <main className="main">
        <section className="profile">
            <div style={{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar-container">
                <button onClick={props.onEditAvatar} className="profile__avatar-edit" />
            </div>
            <div className="profile__info">
                <h1 className="profile__name">{userName}</h1>
                <h2 className="profile__description">{userDescription}</h2>
                <button type="button" onClick={props.onEditProfile} className="profile__edit-button" />
            </div>
            <button type="button" onClick={props.onAddPlace} className="profile__add-button" />
        </section>
        <section className="elements">
            {cards.map((item) => {
                return (
                    <Card 
                        card={item}
                        key={item.cardId}
                        onCardClick = {props.onCardClick}
                    />
                )
            })}
        </section>
    </main>
    )
}


