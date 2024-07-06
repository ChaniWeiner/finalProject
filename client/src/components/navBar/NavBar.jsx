import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { getUserData, getCookie, removeCookie } from '../httpController';

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userId = getCookie('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(userId); // קריאה לפונקצית getUserData מה-HTTP Controller
        setUser(data[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleContactClick = (event) => {
    event.preventDefault();
    navigate('/home/contact');
  };

  const handleSelectOption = (option) => {
    switch (option) {
      case 'profile':
        navigate('/profile');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        navigate('/login');
        break;
    }
  };

  const handleLogout = () => {
    removeCookie('token');
    removeCookie('userId');
    setUser(null); // עדכון הממשק למצב אורח
    navigate('/login');
  };

  return (
    <nav className="nav-bar">
      <div className="logo">
        <a href="/">
          <img src="the logo.png" alt="logo" />
        </a>
      </div>
      <ul className="nav-links">
        <li><a href="/home">אודות</a></li>
        <li><a href="/helpRequest">בקשת סיוע</a></li>
        <li><a href="/volunteer">התנדבות</a></li>
        <li><a href="#contact" onClick={handleContactClick}>צור קשר</a></li>
        {user ? (
          <>
            <li>
              <select onChange={(e) => handleSelectOption(e.target.value)}>
                <option value="profile">פרופיל אישי</option>
                <option value="logout">יציאה</option>
              </select>
            </li>
            <li>{user.userName}</li>
          </>
        ) : (
          <li><a href="/login">התחברות</a></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
