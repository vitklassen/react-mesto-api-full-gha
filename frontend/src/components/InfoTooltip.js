import succesPath from "../image/popup/popup__succes.svg"
import errorPath from "../image/popup/popup__error.svg"
function InfoTooltip(props) {
  const succes = "Вы успешно зарегистрировались!";
  const error = "Что-то пошло не так! Попробуйте ещё раз.";
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className={`popup__container popup__container_type_info`}>
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <img className="popup__image" src={props.isData ? succesPath : errorPath} alt="Изображение" />
        <h2 className={`popup__title popup__title_type_info`}>
          {props.isData ? succes : error}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;