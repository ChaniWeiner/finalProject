import React, { useEffect } from "react";
import { io } from "socket.io-client";

const Request = ({ object, setRequests, requests, volunteerId }) => {
    const keysToDisplay = ["amountMeals", "mealType", "requestType", "requestStatus", "address", "region"];
    const url = `http://localhost:8082/requests`;

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
            const token = getCookie('token');

            const response = await fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "requestStatus": "בוצע",
                    "volunteerId": volunteerId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update request');
            }

            const updatedRequests = requests.filter(item => item.requestId !== object.requestId);
            setRequests(updatedRequests);
            console.log(updatedRequests);

            const data = await response.json();
            console.log('Request updated successfully:', data);

        } catch (error) {
            console.error('Error updating request:', error.message);
        }
    };

    const handleButtonClick = (id) => {
        const confirmed = window.confirm('האם אתה בטוח שברצונך לקחתי?');
        if (confirmed) {
            updateRequest(id);
            alert(" !!תזכי למצוות ");
        }
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const properties = Object.entries(object);

    return (
        <div>
            {properties && properties.map(([key, value], index) => {
                return (
                    (keysToDisplay.includes(key)) ? <p key={index}>
                        {key}: {value}
                    </p> : null
                );
            })}
            <button onClick={() => { handleButtonClick(object.requestId) }}>לקחתי</button>
        </div>
    );
};

export default Request;
