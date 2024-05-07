import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import FormStyles from './styles/Form';
import { useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION($name: String!, $description: String!, $price: Int!, $image: Upload) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleChange, clearForm } = useForm({
    image: '',
    name: 'Nice shoes',
    price: 3243,
    description: 'These are nice shoes',
  });

  const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, { variables: inputs });

  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        await createProduct();
        clearForm();
      }}
    >
      <DisplayError error={error} />

      <fieldset
        disabled={loading}
        aria-busy={loading}
      >
        <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label>

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

        <button type="submit">+ Add Product</button>
      </fieldset>
    </FormStyles>
  );
};
export default CreateProduct;
