import { NavLink } from "react-router-dom";
import '../styles/navigation.css';
// import Logo from "../images/logo.png"
import flower from "../images/Alstroemeria_Closeup_Black_background_576888_1280x938.jpg"

export const Navigation = () => {
  return (
    <nav>
      <div className="Logo">
      <h1 className="logo">Blomsterhörnan</h1>
      <img src ={flower}  alt="flower"/>
      </div>
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
