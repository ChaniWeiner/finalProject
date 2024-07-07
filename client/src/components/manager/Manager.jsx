
import React, { useState } from 'react';
import { getAllMembers } from '../httpController';
const Manager = () => {
    const [members,setMembers]=useState('')
    getAllMembers(setMembers); 
    return (
        <>
            <h3>אתה המנהל </h3>
             <h3>כמות מתנדבים ומבקשי סיוע הם:{members}</h3>

        </>
    );
};

export default Manager;
