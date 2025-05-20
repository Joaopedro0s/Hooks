import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Se estiver usando Expo, instale o uuid com:
// expo install uuid

export default function useShoppingList() {
  const [items, setItems] = useState([]);

  const addItem = (name) => {
    if (!name.trim()) return;
    const newItem = {
      id: uuidv4(),
      name,
      purchased: false,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const togglePurchased = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const clearList = () => {
    setItems([]);
  };

  const stats = {
    total: items.length,
    purchased: items.filter(item => item.purchased).length,
  };

  return { items, addItem, removeItem, togglePurchased, clearList, stats };
}
