import { useState,useEffect } from "react";
import axios from "axios";
function Countries(props) {
    const [countries, setCountries] = useState([]);
    const countryId= props.Country_id;
    useEffect(() => {
   
        fetchCountries();
        
      }, []);
    
    const fetchCountries = async () => {
        const response = await axios.get(`http://localhost:5000/countries`);
        console.log(response);
        setCountries(response.data);
    }
    const handleChange =(e)=>{
        props.handleChange(e);
    }
    return (
        <select id='Country_id' onChange={handleChange} >
         <option value="-1" >select a country</option>
        { countries.map( country => (
            <option value={country.Country_id} key={country.Country_id} selected={countryId === country.Country_id} >{country.Name}</option> 
            ))
         }
         </select>
    )
  }
  
  export default Countries