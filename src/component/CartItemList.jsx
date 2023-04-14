import CartItem from "./CartItem";

function CartItemList(props) {
    const carts = props.cart; 
    const value = props.value; 
    return (
      <div>
      { carts.map( item => (
        <CartItem key={item.Product_id} item={item} value={value}/> 
        ))
     }
    </div>
    )
  }
  
  export default CartItemList
