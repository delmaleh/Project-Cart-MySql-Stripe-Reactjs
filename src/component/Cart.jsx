import CartColumns from "./CartColumns"
import CartEmpty from "./CartEmpty"
import Title from "./Title"
import { UserContext } from "../Context";
import { useContext, useState } from "react";
import CartItemList from "./CartItemList";
import CartTotal from "./CartTotal";
import StripePaymentForm from "./stripe/StripePaymentForm";
import { useSearchParams } from "react-router-dom";
import PaymentModal from "./stripe/Payment";

function Cart() {
  const value = useContext(UserContext);
  const [show,setShow] = useState(false);
  //console.log(value);   
  const handleShow = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  }


  if (value.cart.length>0) {
    return (
      <>  
          <Title name='your' title='cart'/>
          <CartColumns/>
          <CartItemList cart={value.cart} value={value}/>
          <CartTotal handleShow={handleShow} value={value}/> 
          
      </>
          )
    }
        else 
        return (
          <CartEmpty/>
        )

       
      
          
      
      
          
   }
  
  export default Cart