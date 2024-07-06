import React from "react";
import './requestStyles.css'; // קובץ CSS לעיצוב

const MealsReq = ({ object }) => {
    {console.log("55",object);}
    return (
   
        <div >
            <h3>פרטי הארוחה</h3>
            <p><strong>מספר מנות:</strong> {object.amountMeals}</p>
            <p><strong>סוג ארוחה:</strong> {object.mealType}</p>
            <p><strong>כתובת:</strong> {object.address}</p>
            <p><strong>אזור:</strong> {object.region}</p>
        </div>
    );
};

export default MealsReq;
