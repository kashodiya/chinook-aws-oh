































































































































import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the cart context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart provider component
export const CartProvider = ({ children }) => {
  // Initialize cart items from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (track) => {
    // Check if the item is already in the cart
    const existingItem = cartItems.find(item => item.id === track.id);
    
    if (!existingItem) {
      setCartItems([...cartItems, track]);
    }
  };

  // Remove item from cart
  const removeFromCart = (trackId) => {
    setCartItems(cartItems.filter(item => item.id !== trackId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.unitPrice, 0);
  };

  // Context value
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    calculateTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};































































































































