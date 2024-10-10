import HomeLogo from '../../assets/argentBankLogo.png'
import './header.css'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header({name}) {
    const location = useLocation()
    const [activeLink, setActiveLink] = useState(location.pathname)
    useEffect(() => {
      setActiveLink(location.pathname)
    }, [location.pathname])
    return (
        <nav className="main-nav">
          <Link className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src={HomeLogo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>

          
          <div>
            {activeLink === '/user' ? (
              <>
                <Link className="main-nav-item" to="/user">
                  <i className="fa fa-user-circle"></i>
                  {name}
                </Link>
                <Link className="main-nav-item" to="/">
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
    )
}
 
