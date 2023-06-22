export default function Card({ card, onCardClick }) {
    return (

        <article className="group__element">
            <div className="group__rectangle">
                <button className="group__trash" type="button" />
                <img className="group__mask"
                    src={card.link}
                    alt={`Фотография ${card.name}`}
                    onClick={() => onCardClick({ link: card.link, name: card.name })} />
                <div className="group__description">
                    <h2 className="group__picture-name">{card.name}</h2>
                    <div>
                        <button className="group__like" type="button" />
                        <div className="group__likes-counter" />
                    </div>
                </div>
            </div>
        </article>

    )
}