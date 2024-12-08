import React from 'react';
import argentBankLogo from "../img/argentBankLogo.webp";
import { NavLink } from 'react-router-dom';
import { userLogout } from '../../redux/reducers/UserSlices';
import { useDispatch, useSelector } from 'react-redux';

const Header = ({ firstName }) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  const logout = () => {
    console.log("logout");
    dispatch(userLogout());
  }

  const isConnected = !!userReducer.userToken;
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
          {isConnected ? (
            <div className='Info-user'>
              <span className='name-user'>
                <i className="fa fa-user-circle"></i> {firstName}
              </span>
              <div className="main-nav-item" onClick={logout}>
                <i className="fa fa-user-out"></i>
                Sign Out
              </div>
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
