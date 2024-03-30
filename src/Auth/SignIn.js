import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function SignInForm() {
  const [error, setError] = useState('');

  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();
  
    const { email, password } = state;
  
    try {
      const response = await axios.post("http://localhost:8000/api/admin/login", {
        email: email,
        password: password,
      });
  
      // Check if the response contains the expected data indicating successful login
      if (response.data.token) {
        const token = response.data.token;
      localStorage.setItem('authToken', token);
        // Successful login
        console.log('login successfully');
        console.log('Token:', token); 
        window.location.href = '/Dashboard';


      } else {
        // Login failed, handle the error
        setError('Invalid email or password');
      }
    } catch (error) {
      // Handle other errors, such as network issues
      setError('Invalid email or password');
    }
  };
  

  return (
    <div className="form-container sign-in-container">
      <form >
        <h1>Sign in</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          required={true} 
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
            required={true} 
        />
        <a href="#">Forgot your password?</a>
        <button type="submit" onClick={handleOnSubmit}>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
