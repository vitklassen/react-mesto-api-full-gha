import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    function handleSubmit(e) {
      e.preventDefault();
      props.onAddPlace({
      name: name,
      link: link
    });
    }
    function handleNameChange(e) {
      setName(e.target.value);
    }
    function handleLinkChange(e) {
      setLink(e.target.value);
    }
    React.useEffect(() => {
      setName('');
      setLink('');
    }, [props.isOpen]);
    return (
        <PopupWithForm
          name="add"
          title="Новое место"
          textSaveButton="Создать"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          children={
            <>
              <label className="popup__form-field">
                <input
                  className="popup__input popup__input_name_name"
                  type="text"
                  name="name"
                  placeholder="Название"
                  id="name"
                  required
                  minLength="2"
                  maxLength="30"
                  value={name || ''}
                  onChange={handleNameChange}
                />
                <span className="popup__error name-error">1</span>
              </label>
              <label className="popup__form-field">
                <input
                  className="popup__input popup__input_name_link"
                  type="url"
                  name="link"
                  placeholder="Ссылка на картинку"
                  id="link"
                  required
                  value={link || ''}
                  onChange={handleLinkChange}
                />
                <span className="popup__error link-error">1</span>
              </label>
            </>
          }
        />
    )
}

export default AddPlacePopup;