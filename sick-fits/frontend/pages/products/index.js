import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const ProductPage = () => {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </>
  );
};

export default ProductPage;
