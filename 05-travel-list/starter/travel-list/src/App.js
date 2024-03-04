import { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Jeans', quantity: 4, packed: true },
];

export default function App(props = {}) {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo(props = {}) {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form(props = {}) {
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
    console.log(newItem);

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

function PackingList(props = {}) {
  return (
    <div className="list">
      <ul>
        {initialItems.map((element) => (
          <Item item={element} key={element.id} />
        ))}
      </ul>
    </div>
  );
}

function Item(props = {}) {
  return (
    <li>
      <span style={props.item.packed ? { textDecoration: 'line-through' } : {}}>
        {props.item.quantity} {props.item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats(props = {}) {
  return (
    <footer className="stats">
      <em>👜 You have X items on your list, and you already packed (X%)</em>
    </footer>
  );
}
