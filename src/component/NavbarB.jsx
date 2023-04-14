import { useState,useEffect } from 'react'
import axios from 'axios';
import './Navbar.css';
function Navbar() {

    const [categories, setCategories] = useState([{subCategories:[]}]);
    const fetchCategories = async () => {
        const parentid=0;
        var response = await axios.get(`http://localhost:5000/categories/parent/${parentid}`);
        //console.log(value.connect);
        var cat = null;
        var cats = response.data;
        for (let i=0;i<cats.length;i++){
            cat = cats[i];
             response = await axios.get(`http://localhost:5000/categories/parent/${cat.Category_id}`);
            
            cat.subCategories=response.data;
        }
        console.log(cats);
        setCategories(cats);
      };
      

      useEffect(() => {
        
        fetchCategories();
      }, []);
    

  return (
    
    <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">  Category </a>
      <ul className="dropdown-menu">
      {categories.map((category) => (
      <li  className="nav-item dropdown-item"
        key={category.Category_id}
        
      >
       
       <a href={`/product/category/parent/${category.Category_id}`}>{category.Category_Name}
</a>
        {category.subCategories && (
          <ul className="submenu dropdown-menu">
            {category.subCategories.map((subCategory) => (
              <li key={subCategory.Category_id}>
               <a href={`/product/category/${subCategory.Category_id}`}>{subCategory.Category_Name}</a>
                
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
  </li>
  </ul>

		);
}

export default Navbar;


