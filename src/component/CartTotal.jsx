import { Link,useNavigate} from "react-router-dom"
import { Button } from "react-bootstrap"

function CartTotal(props) {
  //const total= props.total;
  const value= props.value;
  const history = useNavigate();


  const checkOut = ()=>{
    history('/checkout');
  }
    return (
        <>
        <div className="container">
        <div className="row">
        <div className="col-10 ml-md-auto  text-capitalize text-end" >
          
        
      <Button  className="button-link" onClick={()=>{value.clearCart()}}>Clear Cart</Button>
      
       <h4>
          <strong>Total:</strong>    <span>{Math.round(value.cartTotal()*100)/100}€</span>
          </h4>
          <Button  className="button-link" onClick={checkOut}>Checkout</Button>
       
       </div>
          
        </div>
        </div>
     
      </>
    )
  }
  
  export default CartTotal