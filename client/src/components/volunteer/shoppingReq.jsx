import React from "react";
import './RequestStyles.css'; // קובץ CSS לעיצוב

const ShoppingReq = ({ object }) => {
    return (
        <div className="request">
            <h3>פרטי הקניות</h3>
            <p><strong>רשימת קניות:</strong> {object.shoppingList}</p>
            <p><strong>כתובת:</strong> {object.address}</p>
            <p><strong>אזור:</strong> {object.region}</p>
        </div>
    );
};

export default ShoppingReq;
