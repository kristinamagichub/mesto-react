
export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose }) {

    return (
        <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={onClose} />
                <h2 className="popup__title">{title}</h2>
                <form
                    className="popup__form"
                    name={name}
                    method="post"
                    noValidate=""
                >
                    {children}
                    <button className="popup__button-save" type="submit">
                        {titleButton || "Сохранить"}
                    </button>
                </form>
            </div>
        </section>

    )
}