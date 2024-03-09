export default function Item(props) {
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
