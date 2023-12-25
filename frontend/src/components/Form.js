function Form(props) {
  return (
    <div className={`userform userform_type_${props.type}`}>
      <h2 className="userform__title">{props.title}</h2>
      <form className="userform__form" name="userform" method="post" onSubmit={props.onSubmit}>
          <input
            className="userform__input userform__input_name_userEmail"
            type="email"
            name="email"
            placeholder="Email"
            required
            minLength="2"
            maxLength="40"
            id="userEmail"
            value={props.email}
            onChange={props.onChange}
          />
          <input
            className="userform__input userform__input_name_password"
            type="password"
            name="password"
            placeholder="Пароль"
            required
            minLength="2"
            maxLength="200"
            id="password"
            value={props.password}
            onChange={props.onChange}
          />
        <button className="userform__save-button" type="submit" onSubmit={props.onSubmit}>
          {props.buttonText}
        </button>
      </form>
      {props.children}
    </div>
  );
}

export default Form;