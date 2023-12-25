import React, { useState } from "react";
import Header from "./Header";
import Form from "./Form";
function Login(props) {
  const [formValue, setFormValue] = useState({ password: "", email: "" });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(formValue.password, formValue.email);
    setFormValue({ password: "", email: "" });
  }
  return (
    <>
      <Header email="" path="sign-up" text="Регистрация" />
      <Form
        title="Вход"
        buttonText="Войти"
        type="login"
        password={formValue.password}
        email={formValue.email}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}
export default Login;
