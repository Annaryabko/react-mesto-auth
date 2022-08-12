import React from "react";
import {login} from '../utils/auth.js';

function Login({history, ...props}) {
  const loginRef = React.useRef();
  const passwordRef = React.useRef();

  function onSubmit(e) {
    e.preventDefault();
    
    login(loginRef.current.value, passwordRef.current.value)
      .then((token) => {
        props.onSuccess(token);
      })
      .catch(() => {
        // показать ошибку
      });
  }

  return (
    <section
      className="login"
    >
      <h2 className="login__title">{props.title}</h2>
      <form
          className="login__inputs"
          name="login"
          onSubmit={onSubmit}
      >
      <input
        defaultValue="email@yandex.ru"
        ref={loginRef}
        className="login__input"
        type="email"
        id="email-input"
        name="email"
        placeholder="Email"
        required
      />
      <input
        defaultValue="somepassword"
        ref={passwordRef}
        className="login__input"
        type="password"
        id="password-input"
        name="password"
        placeholder="Password"
        required
      />
      <input
        className="login__button"
        type="submit"
        value={props.buttonValue}
      />
      </form>
    </section>
  );
}

export default Login;
