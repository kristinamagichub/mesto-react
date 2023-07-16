import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"


export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {


    const { values, errors, isInputValid, handleChange, isValid, reset } = useFormValidation()


    function resetForClose() {
        onClose()
        reset()
    }


    function handleSubmit(evt) {
        evt.preventDefault()
        onAddPlace({ title: values.title, link: values.link }, reset)
    }

    return (
        <PopupWithForm
            name="cards"
            title="Новое место"
            titleButton="Создать"
            isOpen={isOpen}
            isValid={isValid}
            onClose={resetForClose}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__info">
                <input
                    className={`popup__input popup__input_type_title ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_invalid'}`}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Название"
                    minLength={2}
                    maxLength={30}
                    required={true}
                    value={values.title ? values.title : ''}
                    onChange={handleChange}

                />
                <span
                    className="popup__error popup__error_type_title"
                    id="title-error"
                >{errors.title}</span>
                <input
                    className={`popup__input popup__input_type_link ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_invalid'}`}
                    id="link"
                    name="link"
                    type="url"
                    placeholder="Ссылка на картинку"
                    minLength={5}
                    required={true}
                    value={values.link ? values.link : ''}
                    onChange={handleChange}
                />
                <span
                    className="popup__error popup__error_type_link"
                    id="card-link-error"
                >{errors.link}</span>
            </fieldset>
        </PopupWithForm>

    )
}