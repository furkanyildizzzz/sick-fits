import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import ErrorMessage from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;
const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [requestReset, { data, error, loading }] = useMutation(REQUEST_RESET_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await requestReset({ variables: inputs });
    resetForm();
  };

  return (
    <>
      <Form
        method="POST"
        onSubmit={handleSubmit}
      >
        <ErrorMessage error={error} />
        {data?.sendUserPasswordResetLink && <p> Reset link sent to {inputs.email} email address.</p>}
        <h2>Request Resend</h2>
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
          <button type="submit">Send Link</button>
        </fieldset>
      </Form>
    </>
  );
};

export default RequestReset;
