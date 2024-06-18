import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import useUser from '../lib/useUser';
import SignOut from './SignOut';
import { useCart } from '../lib/CartState';
import CartCount from './CartCount';

const Nav = () => {
  const user = useUser();
  const { toggleCartOpen } = useCart();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button onClick={toggleCartOpen}>
            My Cart
            <CartCount
              count={user.cart.reduce((acc, cartItem) => {
                return acc + cartItem.quantity;
              }, 0)}
            />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
