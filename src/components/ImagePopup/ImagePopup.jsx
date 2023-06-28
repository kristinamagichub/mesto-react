export default function ImagePopup({ card, onClose }) {
    return (

        <section className={`popup popup_type_image ${card && "popup_opened"}`} onClick={onClose} >
            <div className="popup__frame">
                <button className="popup__close" type="button" onClick={onClose} />
                <figure className="popup__figure">
                    <img className="popup__picture" src={card ? card.link : '#'} alt={card ? card.name : '#'} />
                    <figcaption className="popup__caption">{card && card.name}</figcaption>
                </figure>
            </div>
        </section >
    )
}