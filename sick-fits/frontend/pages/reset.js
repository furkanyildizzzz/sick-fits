// create reset page
// get token from url
// in reset page send token email and password to the redeemuserpassword....
// handle both keystone error and graphql error

import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

const reset = ({ query }) => {
  if (!query?.token)
    return (
      <div>
        <p>The token does not provided you can send reset request</p>
        <RequestReset />
      </div>
    );

  return (
    <div>
      <p>Reset password with token {query.token}</p>
      <Reset token={query.token}></Reset>
    </div>
  );
};

export default reset;
