// // import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
// // import { json, useNavigate } from "react-router-dom";
// // import { useContext } from 'react';
// // // import { currentUserContext } from '../Main'
// import React, { useEffect, useRef } from 'react';
// import { Outlet } from 'react-router-dom';
// import './home.css'
// const Home = () => {

//   //   const navigate = useNavigate();

//   // //   function logout() {
//   // //     localStorage.clear()
//   // //     window.history.replaceState(null,null,'/');
//   // //     navigate('/login');
//   // //   }

//   // //   const [user, setUser] = useContext(currentUserContext);
//   const counterRef = useRef(null);

//   useEffect(() => {
//     const counterElement = counterRef.current;
//     const duration = parseInt(counterElement.getAttribute('data-duration'), 10);
//     const toValue = parseInt(counterElement.getAttribute('data-to-value'), 10);
//     const fromValue = parseInt(counterElement.getAttribute('data-from-value'), 10);

//     const startTime = performance.now();

//     const animateCounter = (currentTime) => {
//       const elapsedTime = currentTime - startTime;
//       const progress = Math.min(elapsedTime / duration, 1);
//       const currentValue = Math.floor(fromValue + (toValue - fromValue) * progress);
//       counterElement.textContent = currentValue.toLocaleString();

//       if (progress < 1) {
//         requestAnimationFrame(animateCounter);
//       }
//     };

//     requestAnimationFrame(animateCounter);
//   }, []);

//   return (
//     <>
//       <div className="home-container">
//       <h1>אחיות בע"מ</h1>
//       <h5>ביחד נעזור לעם</h5>
//       <h2>כמות קטנה של הזמן שלך יכול לשנות העולם</h2>
//       <p>
//         בתוך החיים העמוסים שכולנו שקועים בו, יש הרבה מאוד קושי לחלק מהעם.
//         מיזם "אחיות בע"מ" – מסיע למשפחות שצריכות סיוע כלשהו .
//         אחיות בע"מ נוסדה כדי להוות קורת גג בטוחה ומסודרת לנשים חרדיות שמעוניינות להושיט יד ולשאת בעול עם אחיותיהן שהן ומשפחותיהן זקוקות לסיוע בשל מצב כלשהו.
//         מעבר לסיוע הפרקטי, רוח האחדות והאחווה מקרבת לבבות ומחזקת את החוסן האישי, קהילתי. </p>
//       <span className="large-bold-span" ref={counterRef} data-duration="2000" data-to-value="1500" data-from-value="0" data-delimiter=",">+0</span>
//       <div className="large-bold-div">מתנדבות</div>
//       <span className="large-bold-span" ref={counterRef} data-duration="2000" data-to-value="1500" data-from-value="0" data-delimiter=",">+0</span>
//       <div className="large-bold-div">מתנדבות</div>
//       <span className="large-bold-span" ref={counterRef} data-duration="2000" data-to-value="1500" data-from-value="0" data-delimiter=",">+0</span>
//       <div className="large-bold-div">מתנדבות</div>
//       <span className="large-bold-span" ref={counterRef} data-duration="2000" data-to-value="1500" data-from-value="0" data-delimiter=",">+0</span>
//       <div className="large-bold-div">מתנדבות</div></div>
//       <Outlet />
//     </>
//   );
// };

// export default Home;
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import './home.css'

const Home = () => {

  const counterRefs = Array.from({ length: 4 }, () => useRef(null));

  useEffect(() => {
    const animateCounter = (counterRef, duration, toValue, fromValue) => {
      const counterElement = counterRef.current;
      const startTime = performance.now();

      const animationFrame = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(fromValue + (toValue - fromValue) * progress);
        counterElement.textContent = currentValue.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(animationFrame);
        }
      };

      requestAnimationFrame(animationFrame);
    };

    animateCounter(counterRefs[0], 2000, 200, 0);
    animateCounter(counterRefs[1], 2000, 100, 0);
    animateCounter(counterRefs[2], 2000, 536, 0);
    animateCounter(counterRefs[3], 2000, 2000, 0);
  }, []);

  return (
    <>
      <div className="home-container">
        <h1>אחיות בע"מ</h1>
        <h5>ביחד נעזור לעם</h5>
        <h2>כמות קטנה של הזמן שלך יכול לשנות העולם</h2>
        <p>
          בתוך החיים העמוסים שכולנו שקועים בו, יש הרבה מאוד קושי לחלק מהעם.
          מיזם "אחיות בע"מ" – מסיע למשפחות שצריכות סיוע כלשהו .
          אחיות בע"מ נוסדה כדי להוות קורת גג בטוחה ומסודרת לנשים חרדיות שמעוניינות להושיט יד ולשאת בעול עם אחיותיהן שהן ומשפחותיהן זקוקות לסיוע בשל מצב כלשהו.
          מעבר לסיוע הפרקטי, רוח האחדות והאחווה מקרבת לבבות ומחזקת את החוסן האישי, קהילתי.
        </p>
        {counterRefs.map((counterRef, index) => {
          let text = '';
          switch (index % 4) {
            case 0:
              text = 'מתנדבות';
              break;
            case 1:
              text = 'משחקים';
              break;
            case 2:
              text = 'ארוחות';
              break;
            case 3:
              text = 'שעות התנדבות';
              break;
            default:
              break;
          }
        return (
        <React.Fragment key={index}>
          <span className="large-bold-span" ref={counterRef} data-duration="2000" data-to-value="1500" data-from-value="0" data-delimiter=",">+0</span>
          <div className="large-bold-div">{text}</div>
        </React.Fragment>
        );})}
      </div>
      <Outlet />
    </>
  );
};

export default Home;
