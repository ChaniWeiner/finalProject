import React, { useState ,useEffect} from "react";
import { io } from "socket.io-client";

const Request = ({ object, setRequests, requests ,volunteerId}) => {
    const keysToDisplay = ["amountMeals", "mealType", "requestType", "requestStatus", "address", "region"];

console.log(volunteerId);
    const properties = Object.entries(object);
    const url = `http://localhost:8082/requests`;
    const handleButtonClick = (id) => {
        const confirmed = window.confirm('האם אתה בטוח שברצונך לקחתי?');
        if (confirmed) {
            updateRequest(id);
        }
        alert(" !!תזכי למצוות ");
    };
    useEffect(() => {
        const socket = io('http://localhost:8082');
    
        socket.on('connect', () => {
          console.log('Connected to server');
        });
    
        socket.on('disconnect', () => {
          console.log('Disconnected from server');
        });
    
        return () => {
          socket.disconnect();
        };
      }, []);
    const updateRequest = async (id) => {
        try {
            const socket = io('http://localhost:8082');
            const response = await fetch(`${url}/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "requestStatus": "בוצע",
                    "volunteerId":volunteerId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update request');
            }
            socket.emit('postRequest', {});

            const temp = requests.filter(item => item.requestId !== object.requestId);
            setRequests(temp);
      console.log(temp);
            const data = await response.json();
            console.log('Request updated successfully:', data);
            
        } catch (error) {
            console.error('Error updating request:', error.message);
        }
    };

    return (
        <div>
           
            {properties && properties.map(([key, value], index) => {
                return (
                    (  keysToDisplay.includes(key))?<p key={index}>
                        {key}: {value}                    </p>:null
                );
            })}
            
            <button onClick={() => { handleButtonClick(object.requestId) }}>לקחתי </button>
        </div>
    );
};

export default Request;