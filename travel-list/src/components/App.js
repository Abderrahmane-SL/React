import React, { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import { Stats } from "./Stats";
import { ParkingList } from "./ParkingList";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }
  function handleRemoveItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    setItems([]);
    const confirm = window.confirm("Are you sure you want to clear the list?");
    if (confirm) {
      setItems([]);
    }
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <ParkingList
        items={items}
        onDeleteItem={handleRemoveItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
