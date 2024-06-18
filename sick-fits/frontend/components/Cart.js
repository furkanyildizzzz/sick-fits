/*

import CartStyles

<CartStyles>
<header>
<Supreme>{name}'s Carts<Supreme>
<header>
<ul>
<ul>
</CartStyles>

go to Header component and add this component there

go to useUser hook and add cart to CURRENT_USER_QUERY
cart:{
id,
quantity,
product:{
id
price
name
photo:{
...
}}
}


const CartItemStyles = styled.li`
padding:1rem 0;
border-bottom: 1px solid var(--ligthGrey)
display: grid
grid-template-columns:auot 1fr auto
img:{margin-rigth:1rem}
h3,p{margin:0}
`

create CartItem function here that returns <CartItemStyles><img widt:100 src alt></CartItemStyles>



create calcTotalPrice(user.cart)
*/

import styled from 'styled-components';
import useUser from '../lib/useUser';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/CartState';
import CloseButton from './styles/CloseButton';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img: {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  const product = cartItem.product;
  if (!product) return null;
  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
};

const Cart = () => {
  const user = useUser();
  const { cartOpen, toggleCartOpen } = useCart();
  if (!user) return null;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{`${user.name}'s Carts`}</Supreme>
        <CloseButton onClick={toggleCartOpen}>&times;</CloseButton>
      </header>
      <ul>
        {user.cart.map((c) => {
          return (
            <CartItem
              key={c.id}
              cartItem={c}
            />
          );
        })}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;
