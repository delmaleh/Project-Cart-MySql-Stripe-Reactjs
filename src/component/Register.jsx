import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../Context"

const Register = () => {
  const [user, setUser] = useState({customer_id:'',First_Name:'',Last_Name:'',Customer_Email:'',Phone:''});
  const history = useNavigate();
  const value = useContext(UserContext);
  
const handleChange = async (e) => {
    //console.log('target',e.target);
    const { id, value } = e.target;
    console.log(id);
    /*if (id=="Password") {
      bcrypt.hash()  
    }*/
    
    setUser(prevState => ({
        ...prevState,
        [id]: value
    }))
}
  
  
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    
      await axios.post('http://localhost:5000/users', user);
      
      const response = await axios.post('http://localhost:5000/users/login', user);

      const token = response.data.token;
      
      localStorage.setItem('token', token);
      value.loginHandler();
      //value.checkToken();
      
      console.log(token,value.connect);
      
      
    
        
    history('/');
  };

  return (
    <div align="center">
      
      <button onClick={() => history('/')}>Retour</button>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <label>Nom</label>
        <input type="text" id='First_Name' value={user.First_Name} onChange={handleChange} />
        <label>Prénom</label>
        <input type="text" id='Last_Name' value={user.Last_Name} onChange={handleChange} />
        <label>Email</label>
        <input type="email" id='Customer_Email' value={user.Customer_Email} onChange={handleChange} />
        <label>Téléphone</label>
        <input type="text" id='Phone' value={user.Phone} onChange={handleChange} />
        <label>Password</label>
        <input type="text" id='Password' value={user.Password} onChange={handleChange} />
        <button type="submit">{user.customer_id ? 'Modifier' : 'Ajouter'}</button>
      </form>
    </div>
  );
};

export default Register;