import { MdDelete } from "react-icons/md";

function CarItem(props) {
    const item = props.item;
    const value = props.value;

    return (
        
        <div className="row text-capitalize text-center">
          <div className="col-10 mx-auto col-lg-2">
              <img src={`/img/${item.Image1}`} style={{width:"5rem",height:"5rem"}} />
          </div>
          <div className="col-10 mx-auto col-lg-2">
              <span>{item.Product_Name}</span>
          </div>
          <div className="col-10 mx-auto col-lg-2">
              <span>{item.Price}€</span>
          </div>
          <div className="col-10 mx-auto col-lg-2">
              <span ><button className="button-link" onClick={() => {value.decrement(item.Product_id)}}>-</button><button className="button-link" disabled>{item.count}</button><button className="button-link" onClick={() => {value.increment(item.Product_id)}}>+</button></span>
          </div>
          <div className="col-10 mx-auto col-lg-2">
              <button className="button-link" onClick={() => {value.removeItem(item.Product_id)}}><MdDelete size={25}/></button>
          </div>
          <div className="col-10 mx-auto col-lg-2">
              <span>{item.total}€</span>
          </div>
          
        </div>
            )
  }
  
  export default CarItem