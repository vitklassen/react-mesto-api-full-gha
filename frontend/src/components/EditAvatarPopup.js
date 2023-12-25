import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props) {
  const avatar = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }
  React.useEffect(() => {
    avatar.current.value = '';
  }, [props.isOpen]);
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      textSaveButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="popup__form-field">
            <input
              className="popup__input popup__input_name_avatarLink"
              type="url"
              name="avatarLink"
              placeholder="Ссылка на новое фото"
              id="avatarLink"
              required
              ref={avatar}
            />
            <span className="popup__error avatarLink-error">1</span>
          </label>
        </>
      }
    />
  );
}
export default EditAvatarPopup;
