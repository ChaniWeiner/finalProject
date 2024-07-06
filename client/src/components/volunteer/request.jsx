import React, { useEffect } from "react";
import { updateRequest } from "../httpController"; // ייבוא הפונקציה לעדכון בקשה מהקובץ המעודכן
import MealsReq from "./mealsReq";
import BabysitterReq from "./babysitterReq";
import CleaningReq from "./cleaningReq";
import ShoppingReq from "./shoppingReq";
import SupportReq from "./supportReq";
import { io } from "socket.io-client";

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

    const handleButtonClick = async (id) => {
        const confirmed = window.confirm('האם אתה בטוח שברצונך לקחתי?');
        if (confirmed) {
            try {
                await updateRequest(id, volunteerId, object.email);
                alert(" !!תזכי למצוות ");
                const updatedRequests = requests.filter(item => item.requestId !== object.requestId);
                setRequests(updatedRequests);
                console.log(updatedRequests);
            } catch (error) {
                console.error('Error updating request:', error.message);
            }
        }
    };

    const renderRequest = () => {
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
            <button onClick={() => handleButtonClick(object.requestId)}>לקחתי</button>
        </div>
    );
};

export default Request;
