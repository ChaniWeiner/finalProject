import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MealsReq from "./mealsReq";
import BabysitterReq from "./babysitterReq";
import CleaningReq from "./cleaningReq";
import ShoppingReq from "./shoppingReq";
import SupportReq from "./supportReq";

const Request = ({ object, setRequests, requests, volunteerId }) => {
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
                    "email": object.email
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

    const renderRequest = () => {
        console.log(object.requestType);
        switch (object.requestType) {
            case 'ארוחה':
                return <MealsReq object={object} />;
            case 'בייביסיטר':
                return <BabysitterReq object={object} />;
            case 'נקיון':
                return <CleaningReq object={object} />;
            case 'קניות':
                return <ShoppingReq object={object} />;
            case 'אוזן קשבת':
                return <SupportReq object={object} />;
            default:
                return null;
        }
    };

    return (
        <div className="request">
            {renderRequest()}
            {/* {      object.requestType=="meals" ?<MealsReq object={object} />:null} */}
            <button onClick={() => handleButtonClick(object.requestId)}>לקחתי</button>
        </div>
    );
};

export default Request;
