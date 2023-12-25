function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? ("popup_opened") : ('')} popup_type_${props.name}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={props.name}
          method="post"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__save-button button-style" type="submit">
            {props.textSaveButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;