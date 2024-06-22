import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import SickButton from './styles/SickButton';
import { useState } from 'react';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

// eslint-disable-next-line no-undef
const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [checkout, { data, loading: checkoutLoading, error: checkoutError }] = useMutation(CHECKOUT_MUTATION);

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    // Stop the form submitting and turn loading on
    e.preventDefault();
    setLoading(true);

    // Start the page transition
    nProgress.start();

    // create the payment method via stripe (token comes here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    // handle any errors from stripe
    if (error) {
      setError(error);
      setLoading(false);
      nProgress.done();
      return false;
    }
    console.log({ paymentMethod });

    // send the token to our keystone server via custom mutation
    await checkout({ variables: { token: paymentMethod.id } });

    if (checkoutError) {
      setError(checkoutError);
      setLoading(false);
      nProgress.done();
      return false;
    }

    // change the page view to the order
    // close the cart

    // turn the loader off
    setLoading(false);
    nProgress.done();
  };
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      <CardElement options={{ disabled: loading }} />
      <SickButton disabled={loading}>{loading ? 'Submitting' : 'Check Out Now'}</SickButton>
    </CheckoutFormStyles>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
