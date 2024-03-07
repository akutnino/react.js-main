import { useState } from 'react';
import Item from './App';

export default function PackingList(props = {}) {
  const { items, onDeleteItem, onToggleItem, onClearList } = props;
  const [sortBy, setSortBy] = useState('input');
  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description')
    sortedItems = items.toSorted((a, b) =>
      a.description > b.description ? 1 : -1
    );
  if (sortBy === 'packed')
    sortedItems = items.toSorted(
      (a, b) => Number(a.package) - Number(b.package)
    );

  const handleSelectChange = function (event) {
    const targetValue = event.target.value;
    setSortBy(targetValue);
  };

  return (
    <div className="list">
      <ul>
        {sortedItems.map((element) => (
          <Item
            item={element}
            key={element.id}
            handleDeleteItem={onDeleteItem}
            handleToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={handleSelectChange}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
