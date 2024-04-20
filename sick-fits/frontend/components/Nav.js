import Link from 'next/Link';

const Nav = () => (
  <nav>
    <Link href="/products">Products</Link>
    <Link href="/sell">Sell </Link>
    <Link href="/orders">Orders</Link>
    <Link href="/account">Account</Link>
  </nav>
);

export default Nav;
