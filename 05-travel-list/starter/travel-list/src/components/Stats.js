export default function Stats(props = {}) {
  const { items } = props;
  const listIsEmpty = items.length === 0;

  if (listIsEmpty) {
    return (
      <p className="stats">
        <em>Start packin boi!</em>
      </p>
    );
  }

  const totalItems = items.length;
  const packedItems = items.reduce(
    (acc, curr) => (curr.package ? (acc += 1) : acc),
    0
  );
  const percentage = Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'You are done packing boi :)'
          : `👜 You have ${totalItems} items on your list, and you already packed
        ${packedItems} (${percentage})%`}
      </em>
    </footer>
  );
}
