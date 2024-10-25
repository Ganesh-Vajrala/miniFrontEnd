import React, { useEffect, useState } from "react";
import './index.css'
import axios from 'axios';
import Cookies from 'js-cookie'
import LabInchargeHeader from "../LabInchargeHeader";

const Labs = () =>{
    const userCookie = Cookies.get('user');
    const user = JSON.parse(userCookie);
    const [labs, setLabs] = useState([]);

    const fetchLabs = async () =>{
        try {
            console.log(user.id);
            const response = await axios.post('http://localhost:3100/labs/data', {
                lab_incharge: user.id,
            },{
                headers: {
                    'Content-Type': 'application/json',
                  },
            });
            console.log(response.data.labs);
            setLabs(response.data.labs);  // Set labs data to state
        } catch (err) {
            console.error('Error fetching labs:', err);
        }
    }

    useEffect(()=>{
        fetchLabs();
    },[]);

    return (
        <div className="main-lab-container w-100">
            <LabInchargeHeader/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Labs</h1>
                </div>
            </div>
        </div>
        </div>
    )
};
export default Labs