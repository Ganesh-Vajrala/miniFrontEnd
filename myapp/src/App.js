import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import {Provider} from 'react-redux';
import Home from './components/Home';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LabProgrammerDashboard from './components/LabProgrammerDashboard';
import LabInchargeDashboard from './components/LabInchargeDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LabCreationForm from './components/LabCreationForm';
import Labs from './components/Labs';


function App() {
  return (
    
    <Router>
      <ToastContainer position="top-center" newestOnTop={true} autoClose={1200} />
      <Routes> {/* Wrap everything inside Routes */}
        {/* Public routes */}
        <Route exact path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute allowedRoles={['lab_incharge']} />}>
          <Route exact path="/lab-incharge-dashboard" element={<LabInchargeDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['lab_programmer']} />}>
          <Route exact path="/lab-programmer-dashboard" element={<LabProgrammerDashboard />} />
        </Route>
        <Route exact path ="/lab-creation" element={<LabCreationForm/>}/>
        <Route exact path='/labs' element = {<Labs/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;