import React, { useEffect, useRef, useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const LabInchargeHeader = () => {
    const navigate = useNavigate();
    const onClickLogout = () => {
        toast.success('Account Logout Successful!');
        Cookies.remove('token');
        Cookies.remove('user');
        navigate('/login', { replace: true });
    };

    return (
        <nav className="nav-header">
            <div className="nav-content">
                <Link to="/lab-incharge-dashboard">
                    <img
                        className="website-logo"
                        src="https://imgs.search.brave.com/jCVskrY9DhrUyR0CX-_mWggPcWFCuQbn577jDQ7AYaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9iL2I1L0xv/Z29fQW51cmFnX1Vu/aXZlcnNpdHkuc3Zn/LzUxMnB4LUxvZ29f/QW51cmFnX1VuaXZl/cnNpdHkuc3ZnLnBu/Zw"
                        alt="website logo"
                    />
                    
                </Link>
                <ul className="nav-menu">
                    <Link to="/lab-incharge-dashboard" className="nav-link">
                        <li>Home</li>
                    </Link>
                    <Link to="/lab-creation" className="nav-link">
                        <li>Labs</li>
                    </Link>
                    <Link to="/lab-incharge-dashboard" className="nav-link">
                        <li>Programmers</li>
                    </Link>
                    <Link to="/lab-incharge-dashboard" className="nav-link">
                        <li>About Us</li>
                    </Link>
                    <li className="nav-link">
                        <button className="header-logout-btn" onClick={onClickLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default LabInchargeHeader;
