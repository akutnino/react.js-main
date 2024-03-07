import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

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

  const handleClearList = function () {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
