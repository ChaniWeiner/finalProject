import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import RequestDetails from "./RequestDetails";
import SearchRequest from "./SearchRequest";
import Style from './loader.module.css';
import Request from "./request";
import { useLocation } from 'react-router-dom';

const VolunteerPage = () => {
  const location = useLocation();
  const volunteerId = location.state.userId;
  const url = `http://localhost:8082/requests`;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = io('http://localhost:8082');

    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('addRequest', (newRequest) => {
      // <Request volunteerId={volunteerId} object={request} requests={requests} setRequests={setRequests} />
      getRequests();
      
    });
    // socket.on('updateRequest', (newRequest) => {
    //   // <Request volunteerId={volunteerId} object={request} requests={requests} setRequests={setRequests} />
    //   getRequests();
      
    // });
  
    
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
  }, [url]);

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
