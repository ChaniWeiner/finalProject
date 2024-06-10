import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import React from 'react'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Home from './components/home/Home'
//import Register from './register/Register'
import { useState, useEffect, useContext, createContext } from 'react'
//import NoPageFound from './NoPageFound'
import NavBar from './components/NavBar'
import Volunteer from './components/volunteer/Volunteer'
import VolunteerLayout from './components/volunteer/Layout'
import VolunteerPage from './components/volunteer/VolunteerPage'
import HelpRequestPage from './components/helpRequest/HelpRequestPage'
import HelpRequest from './components/helpRequest/HelpRequest'
import HelpRequestLayout from './components/helpRequest/Layout'
export const currentUserContext = createContext('');

function App() {
    const [user, setUser] = useState({})

    // useEffect(() => {
    //     const curUser = JSON.parse(localStorage.getItem("user"))
    //     curUser && fetch(`http://localhost:8081/user?username=${curUser.username}`)
    //     .then(response => {if(!response.ok) throw new Error(`status: ${response.status}`); return response.json()})
    //     .then(data => setUser(data["data"]))
    //     .catch((err) => {console.error(err); alert("something went wrong please try later")})

    // }, []);


    return (<>
        {/* <currentUserContext.Provider value={[user, setUser]}> */}
        <div><NavBar /></div>
        <Router>
            <Routes>

                <Route path="/" element={<Navigate to={"/home"} />} />
                <Route path="home" element={<Home />} />

                <Route path="helpRequest" element={<HelpRequestLayout />} >
                    <Route index element={<HelpRequest />} />
                    <Route path="login" element={<Login />} />
                    <Route path="requests" element={<HelpRequestPage />} />
                    <Route path="register" element={<Register />} >
                        <Route path="details" element={<Register />} />
                    </Route>
                </Route>
                <Route path="volunteer" element={<VolunteerLayout />} >
                    <Route index element={<Volunteer />} />
                    <Route path="login" element={<Login />} />
                    <Route path="volunteers" element={<VolunteerPage />} />
                    <Route path="register" element={<Register />} >
                        <Route path="details" element={<Register />} />
                    </Route>
                </Route>
                {/* 
                            <Route path="todos" element={<TodosLayout />} >
                                <Route index element={<Todos />} />
                            </Route>
                            <Route path="posts" element={<PostsLayout />} >
                                <Route index element={<Posts />} />
                                <Route path=":id/comments" element={<Comments />} />
                            </Route>
                        </Route>
                        
                        <Route path="*" element={<NoPageFound />} />  */}

            </Routes>
        </Router>
        {/* </currentUserContext.Provider > */}
    </>)
}

export default App