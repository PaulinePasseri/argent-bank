import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetUser } from '../../features/userSlice';
import { setAuthToken } from '../../services/api';
import HomeLogo from '../../assets/argentBankLogo.png';
import './header.css';

export default function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setActiveLink(location.pathname);
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [location.pathname]);

  const handleLogout = (e) => {
    e.preventDefault();  
    localStorage.removeItem('token');
    setAuthToken(null);
    dispatch(resetUser());
    setIsAuthenticated(false);
    navigate('/');
  };
  console.log(activeLink)

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={HomeLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {user.userName}
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}