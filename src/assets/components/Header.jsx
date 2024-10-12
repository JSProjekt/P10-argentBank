import React from 'react';
import argentBankLogo from "../images/argentBankLogo.png";
import { Navlink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="main-nav">
      <a className="main-nav-logo" href="./index.html">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        <Navlink className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Navlink>
      </div>
    </nav>
        </header>
    );
}

export default Header;
