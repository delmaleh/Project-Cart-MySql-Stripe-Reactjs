import React, { useState,useContext,useEffect, useRef } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../Context"
import Civilities from './Civilities';
import Countries from './Countries';
import './Address.css'
import Addresses from './Addresses';
const Address = () => {
  const [address, setAddress] = useState({});
  const history = useNavigate();
  const value = useContext(UserContext);
 
  
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
   
    fetchCustomerAddress();
  }, []);

  
const fetchCustomerAddress = async() =>{
    const response = await axios.get(`http://localhost:5000/users/${value.user.customer_id}`);
    setAddress(response.data[0]);
} 


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0]);
    if (e.target[0].value=='-1') {
        alert("Please select a civility")
        return; 
    } else if (e.target[6].value=='-1') {
        alert("Please select a country")
        return;
    }
    if (address.Default_Address==1) {
      await axios.put(`http://localhost:5000/addresses/default/${value.user.customer_id}`);
      await axios.put(`http://localhost:5000/addresses/customer/default/${value.user.customer_id}`);
      
    }
    if (address.Address_id>0) {
      
      await axios.put(`http://localhost:5000/addresses/${address.Address_id}`, address); 
    }
    else {
      await axios.put(`http://localhost:5000/addresses/customer/${value.user.customer_id}`, address);  
    }  
    history(0)    
    //history('/address');
  };
  const handleDelete = async(id)=>{
    await axios.delete(`http://localhost:5000/addresses/${id}`);
    
    history(0);
  } 
  const  handleChangeAddress = async(e)=>{
     var value= e.target.value;
     if (value=="-1") fetchCustomerAddress();
     else {
        const response=await axios.get(`http://localhost:5000/addresses/${value}`); 
        setAddress(response.data[0])
        console.log(response);
    }
  }


  return (
    <div align="center">
    <div align="center" style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
      <label>Address List</label>
      <Addresses  handleChange={handleChangeAddress} />
      <Link className="a-link" to="/address/new">Add address</Link>
  
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <label>Title</label>
        <input type="text" id="Title" value={address.Title} disabled={!address.Address_id > 0} onChange={handleChange} />
  
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>Choose this address as Default</label>
          <table style={{  marginLeft: '10px' }}>
            <tr>
            
              <td>
                <input type="radio"  id="Default_Address" value='1' checked={address.Default_Address==1} disabled={address.Default_Address==1} onChange={handleChange} />
              
                <label>Oui</label>
              </td>
              <td>
                <input type="radio" id="Default_Address" value='0' checked={address.Default_Address==0} disabled={address.Default_Address==1} onChange={handleChange}/>
                <label>Non</label>
              </td>
            </tr>
          </table>
        </div>

        <label>Civility</label>
        <Civilities Civility_id={address.Civility_id} handleChange={handleChange} />
  
        <label>First Name</label>
        <input type="text" id="First_Name" value={address.First_Name} onChange={handleChange} />
  
        <label>Last Name</label>
        <input type="text" id="Last_Name" value={address.Last_Name} onChange={handleChange} />
  
        <label>Address</label>
        <input type="text" id="Address" value={address.Address} onChange={handleChange} />
  
        <label>Postcode</label>
        <input type="text" id="Postcode" value={address.Postcode} onChange={handleChange} />
  
        <label>City</label>
        <input type="text" id="City" value={address.City} onChange={handleChange} />
  
        <label>Country</label>
        <Countries Country_id={address.Country_id} handleChange={handleChange} />
  
        <label>Téléphone</label>
        <input type="text" id="Phone" value={address.Phone} onChange={handleChange} />
  
        {address.Address_id > 0 && (address.Default_Address==0) && (
          <button type="submit" onClick={() => handleDelete(address.Address_id)}>remove</button>
        )}
        
        <button type="submit">Apply</button>
      </form>
    </div>
    </div>
  );
  
};

export default Address;