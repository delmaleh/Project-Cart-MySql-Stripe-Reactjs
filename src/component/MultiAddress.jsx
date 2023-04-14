import React, { useState,useContext,useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../Context"
import Civilities from './Civilities';
import Countries from './Countries';
import './Address.css'
import Addresses from './Addresses';
const MultiAddress = () => {
  const [address, setAddress] = useState({});
  const history = useNavigate();
  const value = useContext(UserContext);
  const countryId=useRef();
  
const handleChange = async (e) => {
    //console.log('target',e.target);
    const { id, value } = e.target;
    console.log(id,value);
   
    setAddress(prevState => ({
        ...prevState,
        [id]: value
    }))
}
  

useEffect(() => {
   
    setAddress({Customer_id:value.user.customer_id})
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(e.target[0].value);
    if (e.target[0].value=='-1') {
        alert("Please select a civility")
        return; 
    } else if (e.target[6].value=='-1') {
        alert("Please select a country")
        return;
    }
    console.log('test',value.user.customer_id);
    
    await axios.post(`http://localhost:5000/addresses`,address);  
      
        
    history('/address');
  };

  return (
    <div align="center">
      
      
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
      <label>Title</label>
  <input type="text" id='Title'  onChange={handleChange} />
   
      <label>Civility</label>
      <Civilities Civility_id={''} handleChange={handleChange} />
      
  <label>First Name</label>
  <input type="text" id='First_Name'  onChange={handleChange} />
  
  <label>Last Name</label>
  <input type="text" id='Last_Name'  onChange={handleChange} />
  
  <label>Address</label>
  <input type="text" id='Address'  onChange={handleChange} />
  
  <label>Postcode</label>
  <input type="text" id='Postcode'  onChange={handleChange} />
  
  <label>City</label>
  <input type="text" id='City'  onChange={handleChange} />
  
  <label>Country</label>
  <Countries  handleChange={handleChange} />
        
  <label>Téléphone</label>
  <input type="text" id='Phone' onChange={handleChange} />
  
  <button type="submit">{address.Customer_id ? 'Modifier' : 'Ajouter'}</button>
</form>

    </div>
  );
};

export default MultiAddress;