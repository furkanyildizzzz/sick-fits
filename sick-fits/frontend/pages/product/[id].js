import PropTypes from 'prop-types';
import SingleProduct from '../../components/SingleProduct';

const SingleProductPage = ({ query }) => {
  return <SingleProduct id={query.id} />;
};
export default SingleProductPage;

SingleProductPage.propTypes = {
  query: PropTypes.any,
};
