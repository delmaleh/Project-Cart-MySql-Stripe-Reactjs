import React, { useState,useContext } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../Context"
import { Link } from 'react-router-dom';
//import {jwt} from 'jsonwebtoken';
const Login = () => {

    
   
        
  const value = useContext(UserContext);

  const [Customer_Email, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const linkTo = useNavigate();  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        Customer_Email,
        Password,
      });

      const token = response.data.token;
      
      localStorage.setItem('token', token);
      value.loginHandler();
      //value.checkToken();
      
      console.log(token,value.connect);
      
      
      setUsername('');
      setPassword('');
      linkTo('/');
    } catch (error) {
      console.log(error);
    }
  };

const handleGoogleLogin = () => {

} 


  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={Customer_Email}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button-link">Login</button>
     <label htmlFor="">not a customer ? <Link to='/users/new' >register</Link></label> 
      </form>
      </div>)
};

export default Login;
