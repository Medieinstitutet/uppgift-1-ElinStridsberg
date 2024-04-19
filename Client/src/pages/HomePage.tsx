import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Pics } from '../components//Pics'

const HomePage = () => {
  return (
    <>
    <Header />
    <Navigation />
    <Pics />
    <div> 
      {/* Använd Link-komponenten för att skapa en länk */}
      <Link to="/products">
        <button>Till eshop</button>
      </Link>
    </div>
</>
  );
};

export default HomePage;
