/**
 * create LocalStateContext
 * create LocalStateProvider
 *
 * create CartStateProvider({children})
 *
 */

import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const CartStateProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCartOpen = () => {
    setCartOpen(!cartOpen);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  return <LocalStateProvider value={{ toggleCartOpen, openCart, cartOpen }}>{children}</LocalStateProvider>;
};

const useCart = () => {
  const all = useContext(LocalStateContext);
  return all;
};

export { CartStateProvider, useCart };
