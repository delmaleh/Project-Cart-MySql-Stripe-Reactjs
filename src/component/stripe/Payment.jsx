
import StripePaymentForm from './StripePaymentForm';
import { useContext,useState,useEffect } from 'react';
import { UserContext } from '../../Context';
import axios from 'axios';
function Payment(props) {
  const value = useContext(UserContext);
  const [address,setAddress]=useState({});  
  
  const getAddress = async(id)=> {
      const response = await axios.get(`http://localhost:5000/addresses/default/${id}`);
      console.log(response.data[0]);
      setAddress(response.data[0]);
  }
  useEffect(() => {
      getAddress(value.user.customer_id);
      
      
    }, []);
  

      return (
        <>
      
 
  <div>
        
      <div align="center">
        <div  style={{width:'400px'}}>
         <table className='table'><tr><td >
          <b>Payments Details</b>
         </td>
         <td></td>
         <td></td>
         </tr>
          { value.cart.map( item => (
            <>
            <tr>
                 <td> 
                     <span>{item.count}x{item.Product_Name}</span>
                     </td>       
                 <td style={{textAlign:'right'}}>                
                     <span>{item.Price}€</span>
                 
                 </td>
                  <td style={{textAlign:'right'}}>
                 
                     <span>{item.total}€</span>
                     </td>
            </tr>
                 </>   
                    ))}
          
          <tr><td><b>Total amount:  </b></td>
          <td></td>
          <td style={{textAlign:'right'}}><span>{value.cartTotal()}€</span></td>
          </tr>
          
        <tr>
         
       
        <td><b>Secure Payment By Card</b></td><td></td><td></td></tr>

        <tr><td>Card Holder</td></tr> 
        <tr><td><input type="text" value={`${address.First_Name} ${address.Last_Name}`}></input></td></tr>  
       
         
       </table> <StripePaymentForm value={value} total={value.cartTotal()}/>
         </div>
      
      </div>
      
      </div>
      </>  
      
        
        
        )
    }
    
    export default Payment