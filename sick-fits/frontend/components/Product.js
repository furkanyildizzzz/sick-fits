import PropTypes from 'prop-types';
import ItemStyles from './styles/ItemStyles';
import TitleStyles from './styles/Title';
import PriceTagStyles from './styles/PriceTag';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
const Product = ({ product }) => {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <TitleStyles>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </TitleStyles>
      <PriceTagStyles>{formatMoney(product.price)}</PriceTagStyles>
      <p>{product.description}</p>
      {/*TODO Add buttons to delete and add items*/}
    </ItemStyles>
  );
};

Product.propTypes = {
  children: PropTypes.any,
  product: PropTypes.any,
};

export default Product;
