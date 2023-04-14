import { useState,useEffect } from "react";
import React from 'react';
import axios from "axios";
export const UserContext=React.createContext();


export const UserProvider = (props) => {
    const [connect, setConnect] = useState(false);
    const [user,setUser]=useState({});
    const [cart,setCart]=useState([]);
    
    const key ="test";
    const headers = {
        'Authorization': `Bearer ${localStorage.token}`
      };
    useEffect(() => {
        
        const checkToken = async () => {
            try {
             
             let response= await axios.get(`http://localhost:5000/users/protected/self`,{headers});
             
             response = await axios.get(`http://localhost:5000/users/${response.data.userId}`);
             console.log(response.data[0]);
             setUser(response.data[0]);
             setConnect(true);
             
             //console.log('response',response);
            }
            catch (error) {
             if (error.response.status==401) {
              //console.log(error.response)
                 
             }
            }

         }
        checkToken();
        const tabProducts = localStorage.getItem(key);
        const storedProducts = JSON.parse(tabProducts);
        console.log(storedProducts);
        if (storedProducts) setCart(storedProducts);  
    }, []);
    
    const loginHandler = () => {
        setConnect(true);
        
    }
    
    const logoutHandler = () => {
        localStorage.clear();
        
        setConnect(false);
    }
   
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(cart))
    }, [cart]);
        
const addCart = (cart) => {
    setCart(cart);
}
const increment = (id) => {
    console.log('increment');
    const newItem = cart.find(item => item.Product_id==id);
    newItem.count++;
    newItem.total=newItem.count*newItem.Price;
    const newCart = cart.map(item => {
        return item.id === id ? { ...item, newItem } : item;
      });
    
    setCart(newCart);  
}

const decrement = (id) => {
    console.log('decrement')
    const newItem = cart.find(item => item.Product_id==id);
    if (newItem.count==1) removeItem(id);
    else {
    newItem.count--;
    newItem.total=newItem.count*newItem.Price;
    const newCart = cart.map(item => {
        return item.id === id ? { ...item, newItem } : item;
      });
    
    setCart( newCart);  
    }    
    }

const removeItem = (id) => {
    console.log('removeitem')
    const newCart = cart.filter(product => product.Product_id!=id);  
    setCart(newCart);  
}

const  cartTotal = () => {
    var total = 0;
    for (let i=0;i<cart.length;i++){
        total+=cart[i].total;
    }
    return Math.round(total*100)/100;

}
const nbItems = () =>{
    var nbItem=0;
    for (let i=0;i<cart.length;i++){
        nbItem+=cart[i].count;
    }
    return nbItem;
}

const clearCart = () => {
    console.log('clearcart');
    setCart([]);
}
const civility = async(id)=>{
    const response = await axios.get(`http://localhost:5000/civilities`);
    const civility = response.data.find(civ => civ.Civility_id==id);
    return civility.Name;

}
    return (
        <UserContext.Provider value={{  connect:connect,
                                        loginHandler:loginHandler,
                                        logoutHandler:logoutHandler,
                                        user:user,
                                        cart:cart,
                                        cartTotal:cartTotal,
                                        addCart:addCart,
                                        increment:increment,
                                        decrement:decrement,
                                        removeItem:removeItem,
                                        clearCart:clearCart,
                                        nbItems:nbItems,
                                        civility:civility
                                        
        }}>
            {props.children}
        </UserContext.Provider>
    )


}
