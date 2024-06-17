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

  return <LocalStateProvider value={{ toggleCartOpen, cartOpen }}>{children}</LocalStateProvider>;
};

const useCart = () => {
  const all = useContext(LocalStateContext);
  console.log({ all });
  return all;
};

export { CartStateProvider, useCart };
