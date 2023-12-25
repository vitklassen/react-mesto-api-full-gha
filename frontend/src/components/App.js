import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import DeleteCardPopup from "./DeleteCardPopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/Api";
import auth from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setEditProfile] = useState(false);
  const [isAddPlacePopupOpen, setAddPlace] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatar] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [isCheckData, setData] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    visible: false,
    link: "",
    name: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  function handleEditAvatarClick() {
    setEditAvatar(true);
  }
  function handleEditProfileClick() {
    setEditProfile(true);
  }
  function handleAddPlaceClick() {
    setAddPlace(true);
  }
  function closeAllPopups() {
    setEditAvatar(false);
    setAddPlace(false);
    setEditProfile(false);
    setInfoTooltip(false);
    setSelectedCard({ visible: false, link: "", name: "" });
  }
  function setEmail(email) {
    setUserEmail(email);
  }
  function handleCardClick(link, name) {
    setSelectedCard({ visible: true, link: link, name: name });
  }
  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setUserEmail(email);
        setLoggedIn(true);
        getUserInfo();
        getAllCards();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setData(false);
        setInfoTooltip(true);
        console.log(err);
      });
  }
  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then(() => {
        setData(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setData(false);
        console.log(err);
      })
      .finally(() => {
        setInfoTooltip(true);
      });
  }
  function getUserInfo() {
    api
      .getUserInfo()
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function getAllCards() {
    api
      .getAllCards()
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => {
            return c._id !== card._id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleUpdateUser(newUser) {
    api
      .setUserInfo(newUser)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleUpdateAvatar(newAvatar) {
    api
      .editAvatar(newAvatar.avatar)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .tokenCheck(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.email);
          getUserInfo();
          getAllCards();
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
 
  useEffect(() => {
    setInfoTooltip(false);
    checkToken();
  }, []);
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          ></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                cards={cards}
                onCardClick={handleCardClick}
                onLikeClick={handleCardLike}
                onCardDelete={handleCardDelete}
                userEmail={userEmail}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} />}
          ></Route>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          ></Route>
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
        <DeleteCardPopup />
        <InfoTooltip
          onClose={closeAllPopups}
          isData={isCheckData}
          isOpen={isInfoTooltip}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
