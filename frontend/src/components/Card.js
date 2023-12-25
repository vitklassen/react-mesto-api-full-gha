import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(like => {return like === currentUser._id});
    function handleClick() {
      props.onCardClick(props.card.link, props.card.name);
    }
    function handleLikeClick() {
      props.onCardLike(props.card);
    }
    function handleDeleteClick() {
      props.oncCardDelete(props.card);
    }
    return (
        <div className="elements__element">
          {isOwn && <button className="elements__delete-button button-style"
            type="button" onClick={handleDeleteClick}></button>}
          <img className="elements__photo" src={props.card.link} onClick={handleClick} alt={props.card.name}/>
          <div className="elements__description">
            <h2 className="elements__title">{props.card.name}</h2>
            <div className="elements__like">
              <button className={`elements__like-button ${isLiked && 'elements__like-button_active'}`} type="button" onClick={handleLikeClick}></button>
              <p className="elements__like-count">{props.card.likes.length}</p>
            </div>
          </div>
        </div>
    );
}
 
export default Card;