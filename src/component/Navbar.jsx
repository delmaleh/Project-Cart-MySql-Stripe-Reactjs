import { useState, useEffect,useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import { UserContext } from '../Context';
import { Link } from 'react-router-dom';

  
function Navbar() {
  const [categories, setCategories] = useState([{ subCategories: [] }]);
  const value = useContext(UserContext);
  const search = useRef();
  const linkTo = useNavigate();
  
  const fetchCategories = async () => {
    const parentid = 0;
    const response = await axios.get(`http://localhost:5000/categories/parent/${parentid}`);
    const cats = response.data;

    for (let i = 0; i < cats.length; i++) {
      const cat = cats[i];
      const subResponse = await axios.get(`http://localhost:5000/categories/parent/${cat.Category_id}`);
      cat.subCategories = subResponse.data;
    }
    
    setCategories(cats);
  };
      
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleLogout = () => {
    
    value.logoutHandler();
    
  };

  const handleSearch =  (e) => {
    //e.preventDefault();
    console.log(search.current.value)
    linkTo(`/product/category/search/${search.current.value}`);
  
  }
  return (
    
    <div width="100%"  align="center">
          <div className="navbar-container" >
      
      <ul className="navbar-nav ">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Category</a>
          <ul className="dropdown-menu">
            {categories.map((category) => (
              <li className="nav-item dropdown-item" key={category.Category_id}>
                <Link reloadDocument to={`/product/category/parent/${category.Category_id}`}>{category.Category_Name}</Link>
                {category.subCategories && (
                  <ul className="submenu dropdown-menu">
                    {category.subCategories.map((subCategory) => (
                      <li key={subCategory.Category_id}>
                         <Link reloadDocument to={`/product/category/${subCategory.Category_id}`}>{subCategory.Category_Name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </li>
         
        </ul>
      <form className="search-form" method="get">
            <input type="text" ref={search} placeholder="Search product" />
        <button  type="submit"onClick={handleSearch}>Go</button>
       
  
      </form>
      &nbsp;<Link to='/cart'><div style={{fontSize:'25px',position:'relative'}} >{value.cart.length>0 &&<div className="circle" style={{alignItems:'center',height: '20px',display: 'flex',justifyContent: 'center'}}>{value.nbItems()}</div>}<i  className="bi bi-cart"></i></div></Link>&nbsp;<div class="dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-person-circle" style={{fontSize:'20px'}}></i>{value.user.Last_Name}
          </a>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li class="nav-item dropdown-item"><Link  to="/ordered"><i class="bi bi-cart3"></i> Ordered</Link></li>
    <li class="nav-item dropdown-item"><Link to="#"><i class="bi bi-gear"></i> Account Parameter</Link></li>
    <li class="nav-item dropdown-item"><Link  to="/address"><i class="bi bi-envelope"></i> Addresses</Link></li>
  </ul>
</div>
        
        &nbsp;
      <a href="/" onClick={handleLogout}>Logout</a>
    </div>
    </div>
      
  );
}

export default Navbar;
