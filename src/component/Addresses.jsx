import { useState,useEffect,useContext } from "react";
import axios from "axios";
import { UserContext } from "../Context";
function Addresses(props) {
    const [addresses, setAddresses] = useState([]);
    const addressId = props.Address_id;
    const value = useContext(UserContext);
    useEffect(() => {
   
        fetchAddresses();
        
      }, []);
    
    const fetchAddresses = async () => {
        const response = await axios.get(`http://localhost:5000/addresses/customer/${value.user.customer_id}`);
        console.log(response);
        setAddresses(response.data);
    }

    const handleChange =(e)=>{
        props.handleChange(e);
    }
    return (
        <select id='address_id' onChange={handleChange}>
        <option value="-1" >billing address</option>
        { addresses.map( address => (
            <option value={address.Address_id}   key={address.Address_id} selected={addressId === address.Address_id} >{address.Title}</option> 
            ))
         }
         </select>
    )
  }
  
  export default Addresses