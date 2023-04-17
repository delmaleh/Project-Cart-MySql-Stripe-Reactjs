import {
    Elements,
    CardElement,
    useElements,
    useStripe
  } from "@stripe/react-stripe-js";
  import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";  
  const stripePromise = loadStripe("pk_test_51LXPfFDbZrNxvWip4QGWl7JlVaoOkGSfuWzAFw03shYq5ZtQhAxI9W2as5yIaHwkiSlcXtbwUKy8A07xfdQ5HJqm00CkBn7ed9");
  
  
  
  const PaymentForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const value = props.value;
    const total = value.cartTotal();
    const [alert,setAlert]=useState({text:"",show:false});
    const [success,setSuccess] = useState(false);
    
    const handleAlert = (text) => {
       
    }
    
    
    
    const initCart = () => {
      if (success)
        value.clearCart();
      props.handleClose();
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardElement);
      
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
        console.log("total",total);
        if (error) {
          console.log('[error]', error);
        } else {
          console.log('[PaymentMethod]', paymentMethod);
          try {
            const {id} = paymentMethod;
            var response = await axios.post("http://localhost:5000/stripe/charge",{
              amount:total*100,
              id:id
            });
            
            if (response.data.success) { 
            console.log("Payment success");
             response = await axios.post(`http://localhost:5000/orders/${value.user.customer_id}`);
            const orderId=response.data.lastInsertedId;  
            for (let i=0;i<value.cart.length;i++) {
                 const item = value.cart[i];
                 var orderDetails= {Order_id:orderId,Product_id:item.Product_id,Product_qty:item.count,Product_Price:item.Price,Subtotal:item.total};
                 console.log(orderDetails);
                 await axios.post(`http://localhost:5000/orderdetails/`, orderDetails);

            }
            const order = {Order_Total:value.cartTotal()}
             await axios.put(`http://localhost:5000/orders/${orderId}`,order);
            
            setAlert({text:"Payment success",show:true});
            setSuccess(true);
            
            }
            else console.log('Paiement invalide');
          } 
          catch(error) {
            console.log(error);
          }
        }
         
      };

    return (
      <>
        <form onSubmit={handleSubmit} style={{maxWidth:400}}>

        <CardElement options={{hidePostalCode:true}}/>
        {alert.show && <div className="alert">{alert.text}</div>}
        <div align="right">
           <p>       <button className="button-link" disabled={success}>Pay</button><Link to="/"><button className="button-link" onClick={initCart}>close</button></Link></p>
          </div>

        </form>

      </>
    );
  }
  
  const StripePaymentForm  = (props) => (
    
    <Elements stripe={stripePromise} >
      <PaymentForm total={props.value.cartTotal()} handleClose={props.handleClose} value={props.value}/>
    </Elements>
  );
  export default StripePaymentForm