import { NavLink } from "react-router-dom";
import '../styles/navigation.css';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/products"}>Produkter</NavLink>
        </li>
        <li>
          <NavLink to={"/admin"}>admin</NavLink>
        </li>

      </ul>
    </nav>
  );
};
