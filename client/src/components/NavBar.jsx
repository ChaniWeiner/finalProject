import React from 'react';
import './NavBar.css';
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <a href="/">אחיות מברזל</a>
      </div>
      <ul className="nav-links">
        <li><a href="#about">אודות</a></li>
        <li><a href="#services">שירותים</a></li>
        <li><a href="#activities">פעילויות</a></li>
        <li><a href="volunteer">התנדבות </a></li>
        <li><a href="#contact">צור קשר</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;