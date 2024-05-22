import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';
import { perPage } from '../config';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($first: Int, $skip: Int = 0) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      description
      price
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const Products = ({ page }) => {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      first: perPage,
      skip: page * perPage - perPage,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return (
    <div>
      <ProductListStyles>
        {data.allProducts.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
            />
          );
        })}
      </ProductListStyles>
    </div>
  );
};
export default Products;
