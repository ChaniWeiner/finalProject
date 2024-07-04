import React from "react";
import './RequestStyles.css'; // קובץ CSS לעיצוב

const SupportReq = ({ object }) => {
    return (
        <div className="request">
            <h3>פרטי התמיכה</h3>
            <p><strong>סוג תמיכה:</strong> {object.supportCall}</p>
            <p><strong>כתובת:</strong> {object.address}</p>
            <p><strong>אזור:</strong> {object.region}</p>
        </div>
    );
};

export default SupportReq;
