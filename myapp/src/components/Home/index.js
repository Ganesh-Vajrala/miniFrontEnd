import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";

function Home() {
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  useEffect(()=>{
    console.log(user);
  },[])

  return (
    <div className="app">
      <h1>Real-Time Text Analyzer</h1>
    </div>
  );
}

export default Home;
