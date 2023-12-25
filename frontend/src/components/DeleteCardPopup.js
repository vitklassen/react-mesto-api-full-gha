function DeleteCardPopup () {
    return (
        <div className="popup popup_type_delete-card">
          <div className="popup__container popup__container_type_delete-card">
            <button className="popup__close-button" type="button"></button>
            <h2 className="popup__title popup__title_type_delete-card">
              Вы уверены?
            </h2>
            <button className="popup__save-button button-style" type="button">
              Да
            </button>
          </div>
        </div>
    );
}

export default DeleteCardPopup;