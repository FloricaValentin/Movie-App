import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });

  const [errors, setErrors] = useState({
    user_email: "",
    user_password: "",
    general: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({ user_email: "", user_password: "", general: "" });

    if (formData.user_email.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        user_email: "Email is required.",
      }));
    } else if (!validateEmail(formData.user_email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        user_email: "Please enter a valid email address.",
      }));
    }

    if (formData.user_password.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        user_password: "Password is required.",
      }));
    }

    if (formData.user_email.trim() === "" || formData.user_password.trim() === "") {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          user_email: formData.user_email,
          user_password: formData.user_password
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/movie");
    } catch (error) {
      console.error("Error logging in:", error.message);
      if (error.response && error.response.data && error.response.data.error) {
        setErrors({ ...errors, general: "Email or password doesn't match." });
      } else {
        setErrors({
          ...errors,
          general: "An error occurred. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit} noValidate className="form">
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
            {errors.user_email && (
              <p className="error-text">{errors.user_email}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="user_password" className="label">Password:</label>
            <div className="password-input">
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
            {errors.user_password && (
              <p className="error-text">{errors.user_password}</p>
            )}
          </div>
          {errors.general && (
            <p className="error-text">{errors.general}</p>
          )}
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account yet? <Link to="/register" className="link">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;