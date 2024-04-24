import '../styles/header.css';
import Logo from "../images/logo.png";
import { Link } from 'react-router-dom';
import { BsCart2 } from "react-icons/bs";

export const Header = () => {
    return (
        <>
            <img src={Logo} alt="" />
            <div className="cart">
                <Link to="/cart">
                    <BsCart2 />
                </Link>
            </div>
        </>
    );
}
