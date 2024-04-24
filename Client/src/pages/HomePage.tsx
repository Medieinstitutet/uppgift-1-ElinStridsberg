import { Header } from '../components/Header';
import '../styles/homepage.css';
import ProductList from './ProductList';


const HomePage = () => {
  return (
    <>
<Header />
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
