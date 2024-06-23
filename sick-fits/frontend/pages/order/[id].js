import PropTypes from 'prop-types';
import SingleOrder from '../../components/SingleOrder';

const SingleOrderPage = ({ query }) => {
  return <SingleOrder id={query.id} />;
};
export default SingleOrderPage;

SingleOrderPage.propTypes = {
  query: PropTypes.any,
};
