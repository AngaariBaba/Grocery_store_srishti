import React, { useState } from "react";
import './SignUpForm.css';  // Import the separate CSS file
import axios from "axios";
const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        confirmPassword: ''
    }); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const  handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.password!=formData.confirmPassword)
        {
            alert("password is not same as confirm password");
        }
      const resp = await axios.post("http://localhost:5000/api/signup",formData);
        
        console.log(resp.data);
       
    }

    return (
        <div className="formContainer">
            <h2>Sign Up</h2>
            <form  className ="formContainer"onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Your Name" 
                        className="inputField"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Your Email" 
                        className="inputField"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input 
                        type="tel" 
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter Your Phone Number" 
                        className="inputField"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="address">Address:</label>
                    <textarea 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter Your Address" 
                        className="textareaField"
                        required
                    ></textarea>
                </div>

                <div className="inputGroup">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password" 
                        className="inputField"
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input 
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password" 
                        className="inputField"
                        required
                    />
                </div>

                <button type="submit" className="submitButton">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
