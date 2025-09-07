import React, { useState } from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CSSWelcome from './components/intro/CSSWelcome';

function App() {
  const [showMainApp, setShowMainApp] = useState(false);

  const handleAnimationComplete = () => {
    console.log('Animation completed, showing main website');
    setShowMainApp(true);
  };

  // Show loading animation first
  if (!showMainApp) {
    return <CSSWelcome onComplete={handleAnimationComplete} />;
  }

  // Show main website after animation completes
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/all-products" element={<AllProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
