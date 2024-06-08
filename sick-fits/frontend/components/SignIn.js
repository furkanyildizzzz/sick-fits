import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import ErrorMessage from './ErrorMessage';
import Nav from './Nav';
import { CURRENT_USER_QUERY } from '../lib/useUser';
const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;
const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, error: mutationError, loading }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [CURRENT_USER_QUERY],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signin({ variables: inputs });
    resetForm();
  };

  const fetchError =
    data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure'
      ? data.authenticateUserWithPassword
      : undefined;

  return (
    <>
      <ErrorMessage error={mutationError || fetchError} />
      <Form
        method="POST"
        onSubmit={handleSubmit}
      >
        <h2>Sign Into Your Account</h2>
        <fieldset>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              autoComplete="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              autoComplete="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Sign In</button>
        </fieldset>
      </Form>
    </>
  );
};

export default SignIn;
