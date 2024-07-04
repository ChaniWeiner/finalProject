import React from "react";
import './RequestStyles.css'; // קובץ CSS לעיצוב

const CleaningReq = ({ object }) => {
    return (
        <div className="request">
            <h3>פרטי הניקיון</h3>
            <p><strong>שעות ניקוי</strong> {object.cleaningHours}</p>
            <p><strong>יום ניקוי</strong> {object.cleaningDay}</p>
            <p><strong>כתובת:</strong> {object.address}</p>
            <p><strong>אזור:</strong> {object.region}</p>
        </div>
    );
};

export default CleaningReq;
