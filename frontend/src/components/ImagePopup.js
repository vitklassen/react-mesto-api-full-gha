function ImagePopup(props) {
  return (
    <div className={`popup ${props.card.visible ? ("popup_opened") : ('')} popup_type_card`}>
      <div className="popup__container popup__container_type_card">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <img className="popup__photo" src={props.card.link} alt={props.card.name}/>
        <h2 className="popup__title popup__title_type_card">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;