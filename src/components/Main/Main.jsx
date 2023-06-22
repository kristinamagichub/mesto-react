//функционалбный компонент для блока Main

import { useEffect, useState } from "react"
import api from "../../utils/api.js"
import Card from "../Card/Card.jsx"


export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [userName, setUserName] = useState(' ')
    const [userDescription, setUserDescription] = useState(' ')
    const [userAvatar, setUserAvatar] = useState(' ')

    const [cards, setCards] = useState([]) //cards -массив карточек


    useEffect(() => {
        Promise.all([api.getInfo(), api.getCards()])//получает на вход масив из асихронных методов, он выполняет их параллельно
            .then(([dataUser, dataCards]) => {
                setUserName(dataUser.name)
                setUserDescription(dataUser.about)
                setUserAvatar(dataUser.avatar)

                dataCards.forEach(data => data.myid = dataUser._id)
                setCards(dataCards)
            });
    }, [])

    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar-overlay" type="button" onClick={onEditAvatar}>
                    <img className="profile__image" src={userAvatar} alt="фотография профиля" />
                </button>
                <div className="profile__info">
                    <div className="profile__title-space">
                        <h1 className="profile__name" >{userName}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile} />
                    </div>
                    <p className="profile__job">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} />
            </section>
            <section aria-label="Картинки из коробки">
                <ul className="group" >
                    {cards.map(data => {
                        return (

                            <li className="group__item" key={data._id} >
                                <Card card={data} onCardClick={onCardClick} />
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
};