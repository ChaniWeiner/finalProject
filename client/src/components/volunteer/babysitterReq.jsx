import React from "react";
import './RequestStyles.css'; // קובץ CSS לעיצוב

const BabysitterReq = ({ object }) => {
    return (
        <div className="request">
            <h3>פרטי הבייביסיטר</h3>
            <p><strong>כמות ילדים:</strong> {object.numberOfChildren}</p>
            <p><strong>שעות :</strong> {object.babysittingHours}</p>
            <p><strong>כתובת:</strong> {object.address}</p>
            <p><strong>אזור:</strong> {object.region}</p>
        </div>
    );
};

export default BabysitterReq;
