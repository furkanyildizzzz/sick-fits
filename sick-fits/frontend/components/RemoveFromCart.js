import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

const DELETE_CART_ITEM = gql`
  mutation DELETE_CART_ITEM($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;
const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};
const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { data, loading, error }] = useMutation(DELETE_CART_ITEM, { update, variables: { id } });

  const handleClick = async (e) => {
    e.preventDefault();
    await removeFromCart();
  };

  return (
    <BigButton
      type="button"
      onClick={handleClick}
      title="Remove this item from cart"
      disabled={loading}
    >
      &times;
    </BigButton>
  );
};

export default RemoveFromCart;
