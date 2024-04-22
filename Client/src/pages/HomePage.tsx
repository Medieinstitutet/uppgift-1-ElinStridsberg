import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Pics } from '../components//Pics'
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';

const HomePage = () => {
  return (
    <>
    <Header />
    <Navigation />
    <Pics />
    <Main />
    <div> 
      {/* Använd Link-komponenten för att skapa en länk */}
      <Link to="/products">
        <button>Till eshop</button>
      </Link>
    </div>
    <Footer />
</>
  );
};

export default HomePage;
