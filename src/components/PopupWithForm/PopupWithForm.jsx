
export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit, isValid }) {

    return (
        <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`} onClick={onClose} >
            <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
                <button className="popup__close" type="button" onClick={onClose} />
                <h2 className={` popup__title ${name === 'delete' ? 'popup__title_type_delete' : ''}`}>{title}</h2>
                <form
                    className="popup__form"
                    name={name}
                    method="post"
                    noValidate
                    onSubmit={onSubmit}
                >
                    {children}
                    <button
                        disabled={!isValid}
                        className="popup__button-save"
                        type="submit"
                    >
                        {titleButton || "Сохранить"}
                    </button>

                </form>
            </div>
        </section>

    )
}