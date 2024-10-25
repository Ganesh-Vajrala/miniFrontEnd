import React from "react";
import { useState,useEffect } from "react";
import './index.css'
import LabInchargeHeader from "../LabInchargeHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import PieChart3D from "../PieChart3D";
import { motion } from "framer-motion";

const images = [
  'url("https://agi.anurag.edu.in/wp-content/themes/appply/images/infrstructure-6.jpg")', // Replace these URLs with your own images
  'url("https://agi.anurag.edu.in/wp-content/themes/appply/images/library.jpg")',
  'url("https://gyaanarth.com/wp-content/uploads/2022/06/image-1-12.jpg")',
  'url("https://anurag.ac.in/wp-content/uploads/2020/06/Figure-10.jpg")'
];

const LabInchargeDashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const text = "LAB SCHEDULES OVERVIEW".split(" ");

  /*useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change the image every 4 seconds

    return () => clearInterval(interval);
  }, []);*/

  const [activeIndex, setActiveIndex] = useState(0);

  /*useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? 1 : 0)); // Toggles between spans
    }, 3000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);*/

    return (
      <div className="main-container">
        <LabInchargeHeader/>
        <div className="container">
          <div className="main-banner-container row">
            <div className="main-banner-inner-left-container col-6">
              <h1 className="main-banner-title">
              Department <br/><span className="glitch" data-text="Lab Management System"> Lab Management System</span>
              </h1>
              <p className="main-banner-subtitle">
                <span className={`highlight ${activeIndex === 0 ? 'animate' : ''}`}>
                  Efficient
                </span>{'  '}
                and Streamlined{'  '}
                <span className={`highlight ${activeIndex === 0 ? 'animate' : ''}`}>
                  Lab Operations
                </span>{'  '}
                at Anurag University
              </p>
            </div>
          </div>
        </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
               <hr className="slash-2"/>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
            <div className="labs-overview-container w-100">
            <div className="labs-overview-container-title">
              {text.map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: i / 4,
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
          </div>
            <PieChart3D/>
          </div>
            </div>
          </div>
      </div>
    );
  };
  export default LabInchargeDashboard;
  