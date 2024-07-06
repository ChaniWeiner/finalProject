import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Request from "./request";
import { useLocation } from 'react-router-dom';
import './volunteerPage.css';
import { getRequests } from '../httpController'; // הוספתי את היבוא של פונקציית getRequests מה-HTTP Controller

const VolunteerPage = () => {
  const location = useLocation();
  const volunteerId = location.state.userId;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("meals"); // ברירת מחדל: "meals"

  useEffect(() => {
    const socket = io('http://localhost:8082');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('addRequest', (newRequest) => {
      getRequests(filter, setRequests, setLoading); // קריאה לפונקציה getRequests מה-HTTP Controller עם הפרמטרים המתאימים
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    getRequests(filter, setRequests, setLoading); // קריאה ראשונית לפונקציה getRequests מה-HTTP Controller עם הפרמטרים המתאימים

    return () => {
      socket.disconnect();
    };
  }, [filter]);

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
            {requests.length > 0 ? (
              requests.map((request, index) => (
                <div key={index}>
                  <Request volunteerId={volunteerId} object={request} requests={requests} setRequests={setRequests} />
                </div>
              ))
            ) : (
              <h2>אין בקשות מסוג זה</h2>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VolunteerPage;
