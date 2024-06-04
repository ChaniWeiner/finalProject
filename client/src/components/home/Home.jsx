// import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
// import { json, useNavigate } from "react-router-dom";
// import { useContext } from 'react';
// // import { currentUserContext } from '../Main'
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import './home.css'
const Home = () => {
  
//   const navigate = useNavigate();

// //   function logout() {
// //     localStorage.clear()
// //     window.history.replaceState(null,null,'/');
// //     navigate('/login');
// //   }

// //   const [user, setUser] = useContext(currentUserContext);
  const counterRef = useRef(null);

  useEffect(() => {
    const counterElement = counterRef.current;
    const duration = parseInt(counterElement.getAttribute('data-duration'), 10);
    const toValue = parseInt(counterElement.getAttribute('data-to-value'), 10);
    const fromValue = parseInt(counterElement.getAttribute('data-from-value'), 10);

    const startTime = performance.now();

    const animateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.floor(fromValue + (toValue - fromValue) * progress);
      counterElement.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    };

    requestAnimationFrame(animateCounter);
  }, []);

  return (
    <>
      <h1>home🏡</h1>
      <h2>כמות קטנה של הזמן שלך יכולה לשנות את העולם</h2>
      <h3>
       כאן צריך לכתוב על האירגון
      </h3>
      <span ref={counterRef} data-duration="2000" data-to-value="1500" data-from-value="0" data-delimiter=",">+0</span>
      <div>מתנדבות</div>
      <Outlet />
    </>
  );
};

export default Home;
