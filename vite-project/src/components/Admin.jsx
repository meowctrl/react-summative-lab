import { useState } from 'react';
import { useMenu } from './MenuContext';
import './Menu.css';

const Admin = () => {
  const { menuItems, addMenuItem, updateMenuItem } = useMenu();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', category: '', image: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', description: '', category: '', image: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock login
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      addMenuItem({ ...newItem, price: parseFloat(newItem.price) });
      setNewItem({ name: '', price: '', description: '', category: '', image: '' });
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item.id);
    setEditForm({ ...item });
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    if (editForm.name && editForm.price) {
      updateMenuItem(editingItem, { ...editForm, price: parseFloat(editForm.price) });
      setEditingItem(null);
      setEditForm({ name: '', price: '', description: '', category: '', image: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditForm({ name: '', price: '', description: '', category: '', image: '' });
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Admin Portal</h2>
      <h3>Current Menu</h3>
      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            {item.image && <img src={item.image} alt={item.name} className="item-image" />}
            <h3>{item.name}</h3>
            <p className="category">{item.category}</p>
            <p className="description">{item.description}</p>
            <p className="price">${item.price}</p>
            <button onClick={() => handleEditItem(item)} className="edit-btn">Edit</button>
          </div>
        ))}
      </div>
      <h3>Add New Item</h3>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          rows="3"
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="espresso">Espresso</option>
          <option value="latte">Latte</option>
          <option value="cappuccino">Cappuccino</option>
          <option value="cold-brew">Cold Brew</option>
          <option value="other">Other</option>
        </select>
        <input
          type="url"
          placeholder="Image URL"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>

      {editingItem && (
        <div>
          <h3>Edit Item</h3>
          <form onSubmit={handleUpdateItem}>
            <input
              type="text"
              placeholder="Item Name"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={editForm.price}
              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              rows="3"
            />
            <select
              value={editForm.category}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="espresso">Espresso</option>
              <option value="latte">Latte</option>
              <option value="cappuccino">Cappuccino</option>
              <option value="cold-brew">Cold Brew</option>
              <option value="other">Other</option>
            </select>
            <input
              type="url"
              placeholder="Image URL"
              value={editForm.image}
              onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
            />
            <button type="submit">Update Item</button>
            <button type="button" onClick={handleCancelEdit}>Cancel</button>
          </form>
        </div>
      )}

      <button onClick={() => setIsLoggedIn(false)}>Logout</button>
    </div>
  );
};

export default Admin;