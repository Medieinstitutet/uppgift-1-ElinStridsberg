import { NavLink } from "react-router-dom";
import '../styles/navigation.css';
// import Logo from "../images/logo.png"


export const Navigation = () => {
  return (
    <nav>
<a href="/" className="logo-link">
  <h1 className="logo">Blomsterhörnan</h1>
</a>

   
      {/* <img src={Logo} alt="" /> */}
      <ul>
        {/* <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/products"}>Produkter</NavLink>
        </li> */}
        {/* <li>
          <NavLink to={"/admin"}>admin</NavLink>
        </li> */}
 
      </ul> 
       <NavLink to="/admin">
         <button className="AdminBtn">Admin</button>
       </NavLink>
    </nav> 
  
  );
};
