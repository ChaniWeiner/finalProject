import React from "react";
import './requestStyles.css'; 

const ShoppingReq = ({ object }) => {
    return (
        <div >
            <h3>פרטי הקניות</h3>
            <p><strong>רשימת קניות:</strong> {object.shoppingList}</p>
            <p><strong>כתובת:</strong> {object.address}</p>
            <p><strong>אזור:</strong> {object.region}</p>
        </div>
    );
};

export default ShoppingReq;
