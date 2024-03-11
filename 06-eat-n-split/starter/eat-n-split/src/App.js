import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App(prop) {
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [formAddFriendVisibility, setFormAddFriendVisibility] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriendBtn = () => {
    setFormAddFriendVisibility((currentState) => !currentState);
  };

  const handleSelectedFriend = (friendObject) => {
    return (event) => {
      setSelectedFriend(
        (currentState) =>
          currentState?.id === friendObject.id ? null : friendObject // Nullish?.Coalesing
      );
    };
  };

  const handleNewFriend = (newFriendObject) => {
    setFriendsList((currentState) => [...currentState, newFriendObject]);
    setFormAddFriendVisibility((currentState) => !currentState);
    console.log(friendsList);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsList={friendsList}
          onSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />

        {formAddFriendVisibility && (
          <FormAddFriend onNewFriend={handleNewFriend} />
        )}

        <Button onClick={handleAddFriendBtn}>
          {formAddFriendVisibility ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList(prop) {
  const { friendsList, onSelectedFriend, selectedFriend } = prop;

  return (
    <ul>
      {friendsList.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectedFriend={onSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend(prop) {
  const { friend, onSelectedFriend, selectedFriend } = prop;
  const isSelected = friend.id === selectedFriend?.id; // Nullish?.Coalesing

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={onSelectedFriend(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function Button(prop) {
  const { children, onClick } = prop;

  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend(prop) {
  const { onNewFriend } = prop;
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleNameInput = (event) => {
    const targetValue = event.target.value;
    setName(targetValue);
  };

  const handleImageInput = (event) => {
    const targetValue = event.target.value;
    setImage(targetValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onNewFriend(newFriend);
    setName('');
    setImage('https://i.pravatar.cc/48');
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍👩 Friend Name</label>
      <input type="text" value={name} onChange={handleNameInput} />

      <label>📷 Image URL</label>
      <input type="text" value={image} onChange={handleImageInput} />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill(prop) {
  const { selectedFriend } = prop;

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input type="text" />

      <label>🧍‍♂️ Your expense</label>
      <input type="text" />

      <label>🧑‍🤝‍👩 {selectedFriend.name}'s expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
