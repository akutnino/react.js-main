import { useState } from 'react';

export default function App(props = {}) {
  const [items, setItems] = useState([]);

  const handleAddItems = function (item) {
    setItems((currentState) => [...currentState, item]);
  };

  const handleDeleteItem = function (id) {
    return (event) => {
      setItems((currentState) =>
        currentState.filter((item) => (item.id === id ? false : true))
      );
    };
  };

  const handleToggleItem = function (id) {
    return (event) => {
      setItems((currentState) =>
        currentState.map((item) =>
          item.id === id ? { ...item, package: !item.package } : item
        )
      );
    };
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo(props = {}) {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form(props = {}) {
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
    console.log(newItem);
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

function PackingList(props = {}) {
  const { items, onDeleteItem, onToggleItem } = props;

  return (
    <div className="list">
      <ul>
        {items.map((element) => (
          <Item
            item={element}
            key={element.id}
            handleDeleteItem={onDeleteItem}
            handleToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item(props = {}) {
  const { item, handleDeleteItem, handleToggleItem } = props;

  return (
    <li>
      <input
        type="checkbox"
        value={item.package}
        onChange={handleToggleItem(item.id)}
      />
      <span style={item.package ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={handleDeleteItem(item.id)}>❌</button>
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
