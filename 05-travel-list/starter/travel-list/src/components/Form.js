import { useState } from 'react';

export default function Form(props = {}) {
  const { onAddItems } = props;
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSumbit = function (event) {
    event.preventDefault();

    if (description === '') return;

    const newItem = {
      description,
      quantity,
      package: false,
      id: Date.now(),
    };
    onAddItems(newItem);
    setDescription('');
    setQuantity(1);
  };

  const handleInput = function (event) {
    const targetValue = event.target.value;
    setDescription((currentState) => (currentState = targetValue));
  };

  const handleSelect = function (event) {
    const targetValue = event.target.value;
    setQuantity((currentState) => (currentState = Number(targetValue)));
  };

  return (
    <form className="add-form" onSubmit={handleSumbit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={handleSelect}>
        {Array.from({ length: 10 }, (ele, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={handleInput}
      />
      <button>Add</button>
    </form>
  );
}
