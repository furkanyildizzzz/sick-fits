import useForm from '../lib/useForm';

const CreateProduct = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice shoes',
    price: 3243,
    description: 'These are nice shoes',
  });

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={inputs.name}
        onChange={handleChange}
      />
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        value={inputs.price}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={clearForm}
      >
        Clear Form
      </button>

      <button
        type="button"
        onClick={resetForm}
      >
        Reset Form
      </button>
    </form>
  );
};
export default CreateProduct;
