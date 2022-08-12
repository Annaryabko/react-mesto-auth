import React from "react";
import {register} from '../utils/auth.js';
// import { Link } from "react-dom";

function Register(props) {
  const loginRef = React.useRef();
  const passwordRef = React.useRef();

  function onSubmit(e) {
    e.preventDefault();
    register(loginRef.current.value, passwordRef.current.value)
      .then(() => {
        props.onSuccess();
      })
      .catch(() => {
        // показать ошибку
      });
  }

  return (
    <section
      className="register"
    >
      <h2 className="login__title">{props.title}</h2>
      <form
          className="login__inputs"
          name="login"
          onSubmit={onSubmit}
      >
      <input
        ref={loginRef}
        className="popup__input"
        type="email"
        id="email-input"
        name="email"
        placeholder="Email"
        required
      />
      <input
        ref={passwordRef}
        className="popup__input"
        type="password"
        id="password-input"
        name="password"
        placeholder="Password"
        required
      />
      <input
        className="popup__button"
        type="submit"
        value={props.buttonValue}
      />
      <a>Уже зарегистрированы? Войти</a>
      </form>
    </section>
  );
}

export default Register;

