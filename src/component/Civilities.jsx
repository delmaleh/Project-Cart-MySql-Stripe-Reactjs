import { useState,useEffect } from "react";
import axios from "axios";
function Civilities(props) {
    const [civilities, setCivilities] = useState([]);
    const civilityid = props.Civility_id;
    useEffect(() => {
   
        fetchCivilities();
        
      }, []);
    
    const fetchCivilities = async () => {
        const response = await axios.get(`http://localhost:5000/civilities`);
        console.log(response);
        setCivilities(response.data);
    }

    const handleChange =(e)=>{
        props.handleChange(e);
    }
    return (
        <select id='Civility_id' onChange={handleChange}>
        <option value="-1" >select a civility</option>
        { civilities.map( civility => (
            <option value={civility.Civility_id}   key={civility.Civility_id} selected={civilityid === civility.Civility_id} >{civility.Name}</option> 
            ))
         }
         </select>
    )
  }
  
  export default Civilities