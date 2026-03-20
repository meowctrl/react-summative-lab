import { createContext, useContext, useState, useEffect } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch menu items from json-server
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching menu items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const addMenuItem = async (item) => {
    try {
      const response = await fetch('http://localhost:3001/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error('Failed to add menu item');
      }
      const newItem = await response.json();
      setMenuItems([...menuItems, newItem]);
    } catch (err) {
      console.error('Error adding menu item:', err);
      // Fallback to local state update if API fails
      setMenuItems([...menuItems, { id: Date.now(), ...item }]);
    }
  };

  const updateMenuItem = async (id, updatedItem) => {
    try {
      const response = await fetch(`http://localhost:3001/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        throw new Error('Failed to update menu item');
      }
      const updated = await response.json();
      setMenuItems(menuItems.map(item => item.id === id ? updated : item));
    } catch (err) {
      console.error('Error updating menu item:', err);
      // Fallback to local state update if API fails
      setMenuItems(menuItems.map(item => item.id === id ? { ...item, ...updatedItem } : item));
    }
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MenuContext.Provider value={{
      menuItems,
      addMenuItem,
      updateMenuItem,
      searchTerm,
      setSearchTerm,
      filteredMenuItems,
      loading,
      error
    }}>
      {children}
    </MenuContext.Provider>
  );
};