import React from 'react';
import Navbar from './components/navbar/navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import Footer from './components/Footer/Footer';
import News from './pages/News/News';
import CryptoCalculator from './pages/CryptoCalculator/CryptoCalculator';


const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
        <Route path='/news' element={<News />} /> 
        <Route path='/crypto-calculator' element={<CryptoCalculator/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
