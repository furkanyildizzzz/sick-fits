import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import ErrorMessage from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($email: String!, $password: String!, $token: String!) {
    redeemUserPasswordResetToken(email: $email, password: $password, token: $token) {
      code
      message
    }
  }
`;
const Reset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    token: token,
    email: '',
    password: '',
  });

  const [reset, { data, error: mutationError, loading }] = useMutation(RESET_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await reset({ variables: inputs });
    console.log({ result });
    resetForm();
  };

  const fetchError = data?.redeemUserPasswordResetToken;
  console.log({ mutationError });
  console.log({ fetchError });
  return (
    <>
      <Form
        method="POST"
        onSubmit={handleSubmit}
      >
        <ErrorMessage error={mutationError || fetchError} />
        {data.redeemUserPasswordResetToken === null && <p>Reset Success</p>}
        <h2>Reset</h2>
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
          <button type="submit">Reset</button>
        </fieldset>
      </Form>
    </>
  );
};

export default Reset;
