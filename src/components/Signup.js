import React, { useState } from 'react';
import Loading from './Loading';
import axios from 'axios';

function Signup({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (values) => {
    const errors = {};
    
    if (!values.username) {
      errors.username = 'Username is required';
    } else if (values.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field]) {
      const validationErrors = validate({ ...formData, [field]: value });
      setErrors(validationErrors);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const { confirmPassword, ...signupData } = formData;
        const response = await axios.post('http://localhost:5000/api/auth/register', signupData);
        console.log('Registration successful:', response.data);
        
        alert('Registration successful! Please log in.');
        
        onSwitchToLogin();
      } catch (error) {
        console.error('Registration error:', error.response?.data);
        setErrors({ 
          submit: error.response?.data?.message || 'An error occurred during registration' 
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-content">
        {isLoading && <Loading />}
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Create Account</h2>
        <p className="subtitle">Join our community of developers</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              onBlur={() => handleBlur('username')}
              className={errors.username && touched.username ? 'error' : ''}
            />
            {errors.username && touched.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={errors.email && touched.email ? 'error' : ''}
            />
            {errors.email && touched.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              className={errors.password && touched.password ? 'error' : ''}
            />
            {errors.password && touched.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          {errors.submit && (
            <div className="error-message submit-error">
              {errors.submit}
            </div>
          )}

          <button type="submit" className="btn-submit">Sign Up</button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <button onClick={onSwitchToLogin}>Log In</button></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;