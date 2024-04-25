import '../styles/header.css';
import Logo from "../images/logo.png";
import { Link } from 'react-router-dom';
import { BsCart2 } from "react-icons/bs";
import { useCart } from '../models/CartContext';

export const Header = () => {
    const { cart } = useCart()
    return (
        <>
            <img src={Logo} alt="" />
            <div className="cart">
                <Link to="/cart">
                    <BsCart2 />
                    <p>{cart.length}</p>
                </Link>
            </div>
        </>
    );
}
