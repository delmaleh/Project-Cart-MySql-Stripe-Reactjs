import CartColumns from "./CartColumns"
import CartEmpty from "./CartEmpty"
import Title from "./Title"
import { UserContext } from "../Context";
import { useContext, useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Delivery.css';

function Delivery() {
  const value = useContext(UserContext);
  const [civility, setCivility] = useState({});
  const [country, setCountry] = useState({});
  const [address,setAddress]=useState({});
  const getCivility = async(id)=>{
    const response = await axios.get(`http://localhost:5000/civilities`);
    var civility = response.data.find(civ => civ.Civility_id==id);
    console.log(civility.Name);
    setCivility({name:civility.Name});
    //return ;

}
const getCountry = async(id)=>{
    const response = await axios.get(`http://localhost:5000/countries`);
    var country = response.data.find(count => count.Country_id==id);
    console.log(civility.Name);
    setCountry({name:country.Name});
    

}

const getAddress = async(id)=> {
    const response = await axios.get(`http://localhost:5000/addresses/default/${id}`);
    console.log(response.data[0]);
    setAddress(response.data[0]);
}
useEffect(() => {
    getAddress(value.user.customer_id);
    
    
  }, []);

  if (value.cart.length>0) {
    return (
        <div>  
          <Title name='your' title='cart'/>
          <div align="center" className="table-responsive">
            <table className="table table-borderless" style={{width:'500px'}}>
              <tbody>
                <tr>
                  <td colSpan={3} className="text-center">
                    { value.cart.map( item => (
                      <img src={`/img/${item.Image1}`} style={{width:"5rem",height:"5rem"}} />
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className="w-25">Your Address :</td>
                  <td className="w-50">
                    {address.First_Name} {address.Last_Name}<br />
                    {address.Address}<br />
                    {address.PostCode} {address.City}<br />
                    {address.Phone}
                  </td>
                  <td className="w-25 text-end">
          <div className="d-flex justify-content-end">
            <Link to="/address" className="button-link">Change Address</Link>
          </div>
        </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td className="text-end">
                  <div className="d-flex justify-content-end">
                  <Link to="/payment" className="button-link">Order Payment</Link>
                  </div>  
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
      

    }
        else 
        return (
          <CartEmpty/>
        )

       
      
          
      
      
          
   }
  
  export default Delivery