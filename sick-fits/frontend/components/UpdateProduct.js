import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';
import FormStyles from './styles/Form';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION($id: ID!, $name: String, $description: String, $price: Int) {
    updateProduct(id: $id, data: { name: $name, description: $description, price: $price }) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, { variables: { id: id } });
  const [updateProduct, { data: updateData, loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange } = useForm(data?.Product);

  if (loading || updateLoading) return <p>Loading</p>;
  if (error || updateError) return <DisplayError error={error ?? updateError} />;

  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        var res = await updateProduct({
          variables: {
            id: data.Product.id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        });
      }}
    >
      <DisplayError error={error} />

      <fieldset
        disabled={updateLoading}
        aria-busy={updateLoading}
      >
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </FormStyles>
  );
};
export default UpdateProduct;
