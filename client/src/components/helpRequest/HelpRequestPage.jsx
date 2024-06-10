import React from "react";


import { useLocation } from 'react-router-dom';

const HelpRequestPage=()=>{

  const location = useLocation();
  const volunteerId = location.state.userId;
   return(<>{volunteerId}</>)
}
export default HelpRequestPage;