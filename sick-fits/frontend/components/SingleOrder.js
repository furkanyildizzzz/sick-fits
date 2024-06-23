import OrderStyles from './styles/OrderStyles';
import OrderItemStyles from './styles/OrderItemStyles';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
      id
      label
      total
      charge
      items {
        id
        name
        description
        quantity
        price
        photo {
          id
          image {
            publicUrlTransformed
          }
          altText
        }
      }
    }
  }
`;

const OrderItem = ({ item }) => {
  return (
    <div className="order-item">
      <img
        src={item.photo.image.publicUrlTransformed}
        alt={item.photo.image.altText}
      />
      <div className="item-details">
        <h2>{item.name}</h2>
        <p>Qty: {item.quantity}</p>
        <p>Each: {formatMoney(item.price)}</p>
        <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

const SingleOrder = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, { variables: { id } });

  const order = data?.Order;
  if (loading) return <p>Loading</p>;
  if (error) return <ErrorMessage error={error} />;

  return (
    <OrderStyles>
      <Head>
        <titl>Sick Fits - {order.id}</titl>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.label}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>ItemCount:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <OrderItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </OrderStyles>
  );
};
export default SingleOrder;
