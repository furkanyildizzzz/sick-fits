import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import Head from 'next/head';
import Link from 'next/link';
import OrderItemStyles from './styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

const ORDERS_QUERY = gql`
  query ORDERS_QUERY {
    allOrders {
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

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItemsInAnOrder = (order) => {
  return order.items.reduce((acc, item) => acc + item.quantity, 0);
};

const Orders = () => {
  const { data, loading, error } = useQuery(ORDERS_QUERY);

  if (loading) return <p>loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;
  console.log({ allOrders });
  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>
                    {countItemsInAnOrder(order)} Item{order.items.length > 1 && 's'}
                  </p>
                  <p>
                    {order.items.length} Product{order.items.length > 1 && 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                      title={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
};
export default Orders;
