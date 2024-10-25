import React from "react";
import './index.css'
import LabProgrammerHeader from "../LabProgrammerHeader";

const LabProgrammerDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    return (
      <div>
        <LabProgrammerHeader/>
        <h1>Lab Programmer Dashboard</h1>
        
        <ul>
          <li>Manage Assigned Labs</li>
          <li>Update Lab Configuration</li>
          <li>Track Lab Usage</li>
        </ul>
      </div>
    );
  };
  export default LabProgrammerDashboard;
  