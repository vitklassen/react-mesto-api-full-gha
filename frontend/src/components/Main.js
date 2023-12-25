import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import Card from "./Card";
import Header from "./Header";
function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <>
      <Header email={props.userEmail} path="sign-in" text="Выйти" />
      <main className="content">
        <section className="profile">
          <div className="profile__user">
            <button
              className="profile__edit-avatar-button"
              type="button"
              onClick={props.onEditAvatar}
            >
              <img
                className="profile__avatar"
                alt="Фото"
                src={currentUser.avatar}
              />
            </button>
            <div className="profile__info">
              <div className="profile__user-info">
                <h1 className="profile__name">{currentUser.name}</h1>
                <p className="profile__job">{currentUser.about}</p>
              </div>
              <button
                className="profile__edit-button"
                type="button"
                onClick={props.onEditProfile}
              ></button>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="elements">
          {props.cards.map((item) => {
            return (
              <Card
                key={item._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onLikeClick}
                card={item}
                oncCardDelete={props.onCardDelete}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Main;
