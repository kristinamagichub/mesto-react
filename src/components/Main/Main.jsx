//функционалбный компонент для блока Main

import { memo, useContext } from "react"

import Card from "../Card/Card.jsx"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"


const Main = memo(({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, cards, onCardLike }) => {
    const currentUser = useContext(CurrentUserContext)



    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar-overlay" type="button" onClick={onEditAvatar}>
                    <img className="profile__image" src={currentUser.avatar ? currentUser.avatar : "#"} alt="фотография профиля" />
                </button>
                <div className="profile__info">
                    <div className="profile__title-space">
                        <h1 className="profile__name" >{currentUser.name ? currentUser.name : " "}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile} />
                    </div>
                    <p className="profile__job">{currentUser.about ? currentUser.about : " "}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} />
            </section>
            <section aria-label="Картинки из коробки">
                <ul className="group" >
                    {cards.map(data => {
                        return (

                            <li className="group__item" key={data._id} >
                                <Card card={data} onCardClick={onCardClick} onCardLike={onCardLike} onDelete={onDelete} />
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
})

export default Main