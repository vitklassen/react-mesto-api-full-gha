import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  } 
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      textSaveButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="popup__form-field">
            <input
              className="popup__input popup__input_name_firstname"
              type="text"
              name="firstname"
              placeholder="Ваше имя"
              required
              minLength="2"
              maxLength="40"
              id="firstname"
              value={name || ''}
              onChange={handleNameChange}
            />
            <span className="popup__error firstname-error">1</span>
          </label>
          <label className="popup__form-field">
            <input
              className="popup__input popup__input_name_job"
              type="text"
              name="job"
              placeholder="О себе"
              required
              minLength="2"
              maxLength="200"
              id="job"
              value={description || ''}
              onChange={handleDescriptionChange}
            />
            <span className="popup__error job-error">1</span>
          </label>
        </>
      }
    />
  );
}
export default EditProfilePopup;
