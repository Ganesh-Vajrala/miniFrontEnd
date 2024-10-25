import React, { useState } from 'react';
import axios from 'axios';
import LabInchargeHeader from '../LabInchargeHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import Select from "react-select";

const LabCreationForm = () => {
  const userCookie = Cookies.get("user");
  const user = JSON.parse(userCookie);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: 0,
    system_configuration: {
      ram: "",
      cpu: '',
      storage: "",
      os: ''
    },
    num_projectors: 0,
    num_acs: 0,
    num_wall_mounted_fans: 0,
    lab_incharge: user.id
  });
  const [isRequired,setisRequired] = useState([0, 0, 0]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    if (name.startsWith("system_configuration.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        system_configuration: {
          ...prev.system_configuration,
          [key]: value,
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (name === 'name' && value !== '') {
      setisRequired((prevIsRequired) => [0, prevIsRequired[1], prevIsRequired[2]]);
    }
    if (name === 'location' && value !== '') {
      setisRequired((prevIsRequired) => [prevIsRequired[0], 0, prevIsRequired[2]]);
    }
  };

  const validateFormData = () =>{
    let flag = 1;
    if(formData.name === ""){
      flag = 0;
      setisRequired((prevIsRequired) => [(formData.name === "" ? 1 : 0), prevIsRequired[1], prevIsRequired[2]]);       
    }
    if(formData.location === ""){
      flag = 0;
      setisRequired((prevIsRequired) => [prevIsRequired[0],(formData.location === "" ? 1 : 0), prevIsRequired[2]]);
   
    }
    return flag;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const flag = validateFormData();
    if (flag === 0) {
      toast.error("Required Fields");
      return;
    } 
    const payload = {
      name: formData.name,
      location: formData.location,
      capacity: formData.capacity || 0,
      system_configuration: {
        ram: formData.system_configuration.ram || '',
        cpu: formData.system_configuration.cpu || '',
        storage: formData.system_configuration.storage || '',
        os: formData.system_configuration.os || '',
      },
      num_projectors: formData.num_projectors || 0,
      num_acs: formData.num_acs || 0,
      num_wall_mounted_fans: formData.num_wall_mounted_fans || 0,
      lab_incharge: formData.lab_incharge, 
    };
    console.log(payload);
  
    try {
      const response = await axios.post('http://localhost:3100/labs', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        toast.success('Lab created successfully!');
        setFormData({
          name: '',
          location: '',
          capacity: 0,
          system_configuration: {
            ram: '',
            cpu: '',
            storage: '',
            os: ''
          },
          num_projectors: 0,
          num_acs: 0,
          num_wall_mounted_fans: 0,
          lab_incharge: user.id
        });
      }
    } catch (error) {
      console.error('Error creating lab:', error);
      toast.error(error.response.data.message);
      setError("!Enter Lab Already Exisits.")
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "black" : "white",  // Black on hover
      color: state.isFocused ? "white" : "black",            // White text on hover
    }),
    control: (base) => ({
      ...base,
      backgroundColor: "white",    // Background of select box
      color: "black", 
      outline:"none"           // Text color of selected option
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",              // Text color of selected option
    }),
  };

  const locationOptions = [
    { value: "", label: "Select Location" },
    { value: "H Block", label: "H Block" },
    // Add more options as needed
  ];
  
  return (
    <div className='lab-creation-container'>
        <LabInchargeHeader/>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='text-center mt-3 lab-creation-title'>Create a new Lab</h2>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='row justify-content-center'>
                <form onSubmit={handleSubmit} className='row lab-form-container'>
                    
                    <div className='col-12 mb-0'>
                      <p className='lab-general-head'>Lab General Info</p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="lab-name" className="form-label">
                            Lab Name/Number*
                        </label>
                        <input
                            placeholder='Ex: 701'
                            type="text"
                            name='name'
                            className="form-control"
                            id="lab-name"
                            onChange={handleChange}
                            value={formData.name || ""}
                      
                            />
                            {(isRequired[0] === 1) && (
                            <div style={{color:"red", fontSize:"14px"}}>
                                *Required
                            </div>
                            )}
                    </div>
                    <div className='col-md-4 mb-3'>
                    <label htmlFor="lab-location" className="form-label">
                            Lab Location*
                        </label>
                        <Select
                          name="location"
                          id="lab-location"
                          value={locationOptions.find(option => option.value === formData.location) || ""}
                          onChange={(selectedOption) => handleChange({ target: { name: 'location', value: selectedOption.value } })}
                          
                          options={locationOptions}  // Pass options array here
                          styles={customStyles}  // Apply custom styles
                        />
                      {(isRequired[1] === 1) && (
                    <div style={{color:"red", fontSize:"14px"}}>
                        *Required
                    </div>
                    )}
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="lab-capacity" className="form-label">
                            Lab Capacity
                        </label>
                        <input
                            placeholder='Ex: 75'
                            name="capacity"
                            type="number"
                            className="form-control"
                            id="lab-capacity"
                            onChange={handleChange}
                            value={formData.capacity}
                            
                            />
                    </div>
                    <div className='col-12 mb-0'>
                        <p className='lab-general-head'>System Configurations</p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="lab-ram" className="form-label">
                            RAM
                        </label>
                        <input
                            placeholder='Ex: 8GB'
                            name="system_configuration.ram"
                            type="text"
                            className="form-control"
                            id="lab-ram"
                            onChange={handleChange}
                            value={formData.system_configuration.ram}
                            
                            />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="lab-cpu" className="form-label">
                            CPU
                        </label>
                        <input
                            placeholder='Ex: intel-i5'
                            name="system_configuration.cpu"
                            type="text"
                            className="form-control"
                            id="lab-cpu"
                            onChange={handleChange}
                            value={formData.system_configuration.cpu}
                            
                            />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="lab-storage" className="form-label">
                            Storage
                        </label>
                        <input
                            placeholder='Ex: 256GB'
                            name="system_configuration.storage"
                            type="text"
                            className="form-control"
                            id="lab-storage"
                            onChange={handleChange}
                            value={formData.system_configuration.storage}
                            
                            />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                        <label htmlFor="lab-os" className="form-label">
                            OS
                        </label>
                        <input
                            placeholder='Ex: Windows 11'
                            name="system_configuration.os"
                            type="text"
                            className="form-control"
                            id="lab-os"
                            onChange={handleChange}
                            value={formData.system_configuration.os}
                            
                            />
                    </div>
                    <div className='col-12 mb-0'>
                        <p className='lab-general-head'>Other Details</p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="lab-projectors" className="form-label">
                            Number of Projectors
                        </label>
                        <input
                            placeholder='Ex: 1'
                            name="num_projectors"
                            type="number"
                            className="form-control"
                            id="lab-projectors"
                            onChange={handleChange}
                            value={formData.num_projectors}
                            
                            />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="lab-acs" className="form-label">
                            Number of ACs
                        </label>
                        <input
                            placeholder='Ex: 1'
                            name="num_acs"
                            type="number"
                            className="form-control"
                            id="lab-acs"
                            onChange={handleChange}
                            value={formData.num_acs}
                            
                            />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="lab-wall-mounted-fans" className="form-label">
                            Number of Wall Mounted Fans
                        </label>
                        <input
                            placeholder='Ex: 10'
                            name="num_wall_mounted_fans"
                            type="number"
                            className="form-control"
                            id="lab-wall-mounted-fans"
                            onChange={handleChange}
                            value={formData.num_wall_mounted_fans}
                            
                            />
                    </div>

                    <div className='col-12 flex flex-row justify-content-right w-100 create-button-bg'>
                    <button type="submit" className='button-50'>Create Lab</button>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    
  );
};

export default LabCreationForm;
