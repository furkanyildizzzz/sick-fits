import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../lib/useUser';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    endSession
  }
`;
const SignOut = () => {
  const [signout, { data, error, loading }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [CURRENT_USER_QUERY],
  });

  const handleSignout = async () => {
    await signout();
  };
  return <button onClick={handleSignout}>Sign Out</button>;
};
export default SignOut;
