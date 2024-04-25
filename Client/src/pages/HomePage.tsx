import { Header } from '../components/Header';
import '../styles/homepage.css';
import ProductList from './ProductList';
import pic1 from "../images/1.jpg";
import pic2 from "../images/2.jpg"

const HomePage = () => {
  return (
    <>
<Header />
<div className='hero'>
  <div><img src={pic1} alt='flowers'className='pic' /></div>
  <div className='text'><h3 className='krukväxter'>Krukväxter</h3><p>Gröna och blommande krukväxter är en perfekt present oavsett vart eller till vem du vill skicka dem. Hållbara, lättskötta och vackra. Oavsett om det är en grön eller blommande krukväxt, så är de vackra där de placeras.</p></div>
  
  <div><img src={pic2} alt='flowers' className='pic'/></div>

</div>
  <div className='container'>
<div className='heading'>
   <h1><span>Våra produkter</span></h1>
   </div>
   <ProductList/>
  </div>

</>
  );
};

export default HomePage;
