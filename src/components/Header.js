import React from "react";
import { Route, Switch,Link ,NavLink } from 'react-router-dom';

function Header(props) {
  function logout(e) {
    e.preventDefault();
    props.onLogout();
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__login">
        {/* <NavLink to="/sign-in">Войти!!!</NavLink> */}
        <Switch>
          <Route path="/sign-up">
            <div className="header__login">
              <Link to="/sign-in">Войти</Link>
              {/* <a href="/sign-in">Войти</a> */}
            </div>
          </Route>
          <Route path="/sign-in">
            <div className="header__register">
            <Link to="/sign-up">Регистрация</Link>
            {/* <a href="/sign-up">Регистрация</a> */}
            </div>
          </Route>
          <Route path="/">
            <div className="header__logout">
              {props.email} <a onClick={logout}>Выход</a>
            </div>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
