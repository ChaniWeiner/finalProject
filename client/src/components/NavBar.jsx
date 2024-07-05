// import React from 'react';
// import './NavBar.css';
// import { useNavigate } from "react-router-dom";
// const NavBar = () => {
//   return (
//     <nav className="nav-bar">
//       <div className="logo"><a href="/">
//           <img src="the logo.png" /></a></div>
//       <ul className="nav-links">
//         <li><a href="/home">אודות</a></li>
//         <li><a href="/helpRequest">בקשת סיוע</a></li>
//         <li><a href="/volunteer">התנדבות </a></li>
//         <li><a href="#contact">צור קשר</a></li>
//         <li><a href="/profile">אזור אישי</a></li>
      
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;
import React, { useState } from 'react';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const NavBar = () => {

  const navigate = useNavigate();
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};
  const handleContactClick = (event) => {
    event.preventDefault();
    navigate('/home/contact');
  };
  const [user,setUser]=useState('')
  const userId = location.state?.userId||getCookie("userId");
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const token = getCookie('token');
            if (!token) {
              setUser('');
              return;
            }

            const response = await fetch(`http://localhost:8082/user?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUser(data[0]);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    if (userId) {
        fetchUserData();
    }
}, [userId, navigate])
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
        {/* <li><a href="/profile">אזור אישי</a></li> */}
        <li><a href="/profile">{user==''?"אורח":`${user.userName}`}</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
