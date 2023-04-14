import { useState,useEffect,useContext } from 'react'
import { useParams,useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Category.css';
import { UserContext } from '../Context';

function Category() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    
    const { id } = useParams();
    const {pathname}  = useLocation();
    const linkTo = useNavigate();
    const value = useContext(UserContext);
    const fetchProducts = async () => {
        
      const response = await axios.get(`http://localhost:5000/products/category/${id}`);
      
          
      console.log(response.data);
      
      setProducts(response.data);
    };
    const fetchParentProducts = async () => {
              const response = await axios.get(`http://localhost:5000/products/category/parent/${id}`);
              console.log(response.data);

      setProducts(response.data);
    };
    const fetchSearchProducts = async () => {
      const response = await axios.get(`http://localhost:5000/products/category/search/${id}`);
      console.log(response.data);

setProducts(response.data);
};
    const fetchCategory = async () => {
      const response = await axios.get(`http://localhost:5000/categories/${id}`);
      setCategory(response.data[0]);
    }
      useEffect(() => {
        
        
        const from=pathname.split('/')[3];
        if (from=="parent") {
          fetchCategory();
          fetchParentProducts();
        }
        else if (from=="search") {
          setCategory({Category_Name:''});
          fetchSearchProducts();
        }
        else {
          fetchCategory();
          fetchProducts();
        }
       // console.log(id,from); 
        
       
        
      }, []);
      const addCart= (id) => {
        const product = products.find(product => product.Product_id==id);
        console.log(product);
        console.log('hello from add to cart');
    
            
        const item = value.cart.find(item => item.Product_id==id);
        var newCart=[];
        if (item==undefined) 
        { 
            console.log('itemundefined',item)
            product.count=1;
            product.total=product.Price;
            newCart=[...value.cart,product];        
        }   
        else {
            console.log('item',item); 
            /*newCart = products.cart.map(item => {
                return item.id === id ? { ...item, item } : item;
            });
            */item.count++;
            item.total=item.Price*item.count;
            
            newCart = value.cart.map(item => {
                return item.id === id ? { ...item, item } : item;
            });
           
        }
        value.addCart(newCart);
        linkTo('/cart');
    
    //var cartTotal=calculTotal();
    //setProducts(() =>{return{storeProducts:newProducts,detailProduct,cart:newCart,cartTotal:cartTotal}});
    //console.log(products.cart);

      }
    
      return (
        <>
        
        <div>
          <div className="category">
            <a href="#" className="active">{category.Category_Name}</a>
            <img src="" width="100%" />
          </div>
          <div className="products">
            {products.map((product) => (
              <div key={product.Product_id} className="product">
                <div className="product-id" ><img src={`/img/${product.Image1}`} /></div>
                <div className="product-name">
                  {product.Product_Name}
                  <div className="product-description">{product.Product_Description}</div>
                </div>
                <div className="product-price">Prix:{product.Price} €</div>
                <div><button className="button-add" onClick={()  =>{addCart(product.Product_id)}}>add to cart</button></div>
              </div>
            ))}
          </div>
        </div>
        </>
      );
      
}

export default Category;
