import gql from 'graphql-tag';
import PaginationStyles from './styles/PaginationStyles';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { perPage } from '../config';
import DisplayError from './ErrorMessage';
import Head from 'next/head';

const ALL_PRODUCTS_COUNT_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_COUNT_QUERY);

  if (loading) return <p>loading ...</p>;
  if (error) return <DisplayError error={error} />;

  const count = data._allProductsMeta.count;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>

      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>{`<-Prev`}</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>{`Next->`}</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
