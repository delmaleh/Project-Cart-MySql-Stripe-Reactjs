
import React, { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../Context";
import format from 'date-fns/format';
const Ordered = () => {
  const [orders, setOrders] = useState([]);
  const value = useContext(UserContext);
  const fetchOrders = async () => {
    const response = await axios.get(`http://localhost:5000/orders/${value.user.customer_id}`);
    setOrders(response.data);
  };
  
  useEffect(() => {
    
    fetchOrders();
  }, []);

  
  
  return (
    <div align="center">
       
      <table style={{ borderCollapse: 'collapse', width: '400px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Delivered</th>
            <th>Total</th>
         </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.Order_id}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{order.Order_id}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{format(new Date(order.Order_Date), 'yyyy/MM/dd kk:mm:ss')}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{order.is_Delivered?'yes':'No'}</td>
              <td style={{ border: '1px solid black', padding: '5px',textAlign:'right' }}>{order.Order_Total}€</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Ordered;
