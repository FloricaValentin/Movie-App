import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Register.scss';


const Register = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Registration successful:', data); 
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  
  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="user_name" className="label">Username:</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="Username"
              value={formData.user_name}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="user_email" className="label">Email:</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              placeholder="Email"
              value={formData.user_email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="user_password" className="label">Password:</label>
            <input
              type="password"
              id="user_password"
              name="user_password"
              placeholder="Password"
              value={formData.user_password}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login" className="link">LogIn</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;