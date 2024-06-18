import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../lib/useUser';
import { useCart } from '../lib/CartState';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($productId: ID!) {
    addToCart(productId: $productId) {
      id
    }
  }
`;

const AddToCart = ({ productId }) => {
  const { openCart } = useCart();
  const [addToCart, { data, error, loading }] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: () => {
      openCart();
    },
  });
  const handleClick = async (e) => {
    e.preventDefault();
    await addToCart({
      variables: { productId },
    });
  };
  return (
    <button
      disabled={loading}
      type="button"
      onClick={handleClick}
    >
      Add{loading && 'ing'} To Cart +
    </button>
  );
};
export default AddToCart;
