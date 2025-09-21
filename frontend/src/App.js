























































































































import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArtistsPage from './pages/ArtistsPage';
import ArtistDetailPage from './pages/ArtistDetailPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import GenresPage from './pages/GenresPage';
import GenreDetailPage from './pages/GenreDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="container py-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/artists" element={<ArtistsPage />} />
              <Route path="/artists/:id" element={<ArtistDetailPage />} />
              <Route path="/albums/:id" element={<AlbumDetailPage />} />
              <Route path="/genres" element={<GenresPage />} />
              <Route path="/genres/:id" element={<GenreDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;























































































































