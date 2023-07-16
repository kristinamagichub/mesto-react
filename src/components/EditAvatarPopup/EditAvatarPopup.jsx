import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"



export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const input = useRef()


    const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation()

    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateAvatar({ avatar: input.current.value }, reset)
    }



    return (
        <PopupWithForm
            name="editAvatar"
            title="Обновить аватар"
            isOpen={isOpen}
            isValid={isValid}
            onClose={resetForClose}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__info">
                <input
                    ref={input}
                    className={`popup__input popup__input_type_link ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_unvalid'} `}

                    id="avatar"
                    name="avatar"
                    type="url"
                    placeholder="Ссылка на картинку"
                    required=""
                    value={values.avatar ? values.avatar : ''}
                    onChange={handleChange}

                />
                <span
                    className="popup__error popup__error_type_avatar"
                    id="avatar-link-error"
                >{errors.avatar}</span>
            </fieldset>
        </PopupWithForm>
    )
}