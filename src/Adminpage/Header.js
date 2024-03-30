import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios'; // Import axios for API requests
import "./Header.css";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if the user is logged in (you can implement your own logic here)
    const userIsLoggedIn =  localStorage.getItem('token') !== null;
    setIsLoggedIn(userIsLoggedIn);
    import('bootstrap/dist/css/bootstrap.min.css');
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve authentication token from local storage
      await axios.post('http://localhost:8000/api/admin/logout', null, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
        },
      });
      // Clear authentication token from local storage
      localStorage.removeItem('authToken');
      // Redirect to the login page or perform any other action
      window.location.href = '/'; // Redirect to the login page after logout
    } catch (error) {
      console.error('Logout error:', error);
      // Handle error if logout fails
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">DEV WEB</a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleMenuToggle}
          aria-label={isMenuOpen ? "close menu" : "menu"}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/Dashboard">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">Users</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/Conge">Conge</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
          </ul>
          <div >
<div class="search-container">
  <input class="input" type="text" placeholder="Search.."/>
  <svg viewBox="0 0 24 24" class="search__icon">
    <g>
      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
      </path>
    </g>
  </svg>
</div>
</div>
<button class="cta" onClick={handleLogout}>
  <span>Deconnection</span>
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
</button>


        </div>
      </div>
    </nav>
  );
};
export default Header;
