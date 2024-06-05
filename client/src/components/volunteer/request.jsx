import React, { useState } from "react";

const Request = ({ object, setRequests, requests }) => {
    const keysToDisplay = ["amountMeals", "mealType", "requestType", "requestStatus", "address", "region"];

    const properties = Object.entries(object);
    const url = `http://localhost:8082/requests`;
    const handleButtonClick = (id) => {
        const confirmed = window.confirm('האם אתה בטוח שברצונך לקחתי?');
        if (confirmed) {
            updateRequest(id);
        }
        alert(" !!תזכי למצוות ");
    };
  
    const updateRequest = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "requestStatus": "בוצע"
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update request');
            }
            const temp = requests.filter(item => item.requestId !== object.requestId);
            setRequests(temp);
      
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