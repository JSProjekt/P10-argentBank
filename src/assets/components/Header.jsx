import React from 'react';
import argentBankLogo from "../images/argentBankLogo.png";
import { NavLink, useLocation } from 'react-router-dom';

const Header = ({firstName}) => {
    const location = useLocation();
    const isPageUser = location.pathname === "/user";
    return (
        <header>
            <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {isPageUser ? (
          <div className='Info-user'>
            <span className='name-user'>
              <i className="fa fa-user-circle"></i> {firstName}
              </span>
              <NavLink className="main-nav-item" to="/logout">
                <i className="fa fa-user-out"></i>
                Sign Out
              </NavLink>
          </div>
        ) : (
        <NavLink className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
        )}
      </div>
    </nav>
        </header>
    );
}

export default Header;
