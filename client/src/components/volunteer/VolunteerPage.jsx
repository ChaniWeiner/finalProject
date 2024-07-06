
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Request from "./request";
import { useLocation } from 'react-router-dom';
import './volunteerPage.css'
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const VolunteerPage = () => {
  const location = useLocation();
  const volunteerId = location.state.userId;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("meals"); // ברירת מחדל: "meals"

  const url = `http://localhost:8082/requests/${filter}`;

  useEffect(() => {
    const socket = io('http://localhost:8082');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('addRequest', (newRequest) => {
      getRequests();
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    const getRequests = async () => {
      try {
        const token = getCookie('token'); // קבלת הטוקן מהעוגיה
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setRequests(data);
          console.log(requests);
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
  }, [url]);

  return (
    <div className="volunteer-page">
      {loading ? (
        <div className="loader">
          {/* Add loader animation here */}
        </div>
      ) : (
        <>
          <div>
            <button onClick={() => { setFilter("meals") }}>ארוחה</button>
            <button onClick={() => setFilter("babysitter")}>בייבי סיטר</button>
            <button onClick={() => setFilter("cleaning")}>נקיון</button>
            <button onClick={() => setFilter("shopping")}>קניות</button>
            <button onClick={() => setFilter("support")}>אוזן קשבת</button>
          </div>
          <div className="requests_container">

            {requests && requests.map((request, index) => (
              console.log(request),
              <div key={index}>
                <Request volunteerId={volunteerId} object={request} requests={requests} setRequests={setRequests} />
              </div>      

            ))}</div>
            <div>
            {requests.length==0&& <h2>אין בקשות מסוג זה</h2>}
            </div>
        </>
      )}
    </div>
  );
};

export default VolunteerPage;
