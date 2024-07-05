import React from "react";
import './requestStyles.css';

const SupportReq = ({ object }) => {
    return (
        <div className="request">
            <h3>פרטי התמיכה</h3>
            <p><strong>נושא השיחה:</strong> {object.supportCall}</p>
            <p><strong>כתובת:</strong> {object.address}</p>
            <p><strong>אזור:</strong> {object.region}</p>
        </div>
    );
};

export default SupportReq;
