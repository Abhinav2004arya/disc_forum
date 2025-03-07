import React, { useState } from 'react';
import Loading from './Loading';
import axios from 'axios';

function Login({ onClose, onSwitchToSignup, onLoginSuccess }) {
    
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (values) => {
    const errors = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
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
    setTouched({ email: true, password: true });

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', formData);
        
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          console.log('Login successful:', response.data);
          onLoginSuccess(response.data.user);
          onClose();
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ 
          submit: error.response?.data?.message || 'Login unsuccessful. Please check your credentials.' 
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
        <h2>Welcome Back!</h2>
        <p className="subtitle">Log in to join the discussion</p>

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              className={errors.password && touched.password ? 'error' : ''}
            />
            {errors.password && touched.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {errors.submit && (
            <div className="error-message submit-error">
              {errors.submit}
            </div>
          )}

          <button type="submit" className="btn-submit">Log In</button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <button onClick={onSwitchToSignup}>Sign Up</button></p>
        </div>
      </div>
    </div>
  );
}

export default Login; 