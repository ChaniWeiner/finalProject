import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { json, useNavigate } from "react-router-dom";
import { useContext } from 'react';
// import { currentUserContext } from '../Main'


function Home() {

  const navigate = useNavigate();

//   function logout() {
//     localStorage.clear()
//     window.history.replaceState(null,null,'/');
//     navigate('/login');
//   }

//   const [user, setUser] = useContext(currentUserContext);

  return (
    <>
      <h1>home🏡</h1>
      {/* <h2>welcome {user.name}</h2> */}
      {/* <button onClick={() => { navigate(`./info`) }}>Info</button>
      <button onClick={() => { navigate(`./todos`) }}>Todos</button>
      <button onClick={() => { navigate(`./posts`) }}>Posts</button>
      <button onClick={logout}>Logout</button> */}
      <Outlet />
    </>
  )

}

export default Home