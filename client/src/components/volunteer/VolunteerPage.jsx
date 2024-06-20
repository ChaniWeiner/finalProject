import React, { useState, useEffect } from "react";
import RequestDetails from "./RequestDetails";
import SearchRequest from "./SearchRequest";
import Style from './loader.module.css';
import Request from "./request";
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";

const VolunteerPage = () => {
  const location = useLocation();
  const volunteerId = location.state.userId;
  const url = `http://localhost:8082/requests`;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = io('http://localhost:8082');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('newRequest', (newRequest) => {
      // עדכון הבקשות כאשר מתקבלת בקשה חדשה
      setRequests((prevRequests) => [...prevRequests, newRequest]);
      // כאן תוכל להוסיף כל פעולה נוספת שאתה רוצה לבצע כאשר מתקבלת בקשה חדשה
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    const getRequests = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setRequests(data);
        } else {
          alert("Oops, something went wrong...");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        alert("Error fetching requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getRequests();

    return () => {
      socket.disconnect();
    };
  }, [url, socket]);

  return (
    <>
      <h1>Requests</h1>
      <div className="requests_container">
        <SearchRequest setRequests={setRequests} allRequests={requests} requests={requests} />
        {loading ? (
          <div className={Style.loader}>
            <div className={Style.circle}></div>
            <div className={Style.circle}></div>
            <div className={Style.circle}></div>
            <div className={Style.circle}></div>
          </div>
        ) : (
          <>
            {requests && requests.map((request, index) => (
              <div key={index}>
                <Request volunteerId={volunteerId} object={request} requests={requests} setRequests={setRequests} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default VolunteerPage;
