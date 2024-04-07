import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already registered? <Link to="/login">Login here</Link>.</p>
    </div>
  );
}

export default Register;