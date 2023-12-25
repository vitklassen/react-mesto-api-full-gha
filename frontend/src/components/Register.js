import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
function Register(props) {
  const [formValue, setFormValue] = useState({password: '', email: ''});
  function handleChange(e) {
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(formValue.password, formValue.email);
  }
  return (
    <>
      <Header email="" path="sign-in" text="Войти" />
      <Form
        title="Регистрация"
        buttonText="Зарегестрироваться"
        type="register"
        password={formValue.password}
        email={formValue.email}
        onChange={handleChange}
        onSubmit={handleSubmit}
        children={
          <Link className="userform__description" to="/sign-in">
            Уже зарегестрированы? Войти
          </Link>
        }
      />
    </>
  );
}
export default Register;
