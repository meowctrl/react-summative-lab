import { useMenu } from './MenuContext';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const { filteredMenuItems, loading, error } = useMenu();

  if (loading) {
    return (
      <div className="menu-grid">
        <div className="menu-item">
          <p>Loading coffee menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-grid">
        <div className="menu-item">
          <p>Error loading menu: {error}</p>
          <p>Please make sure the backend server is running: <code>npm run server</code></p>
        </div>
      </div>
    );
  }

  if (filteredMenuItems.length === 0) {
    return (
      <div className="menu-grid">
        <div className="menu-item">
          <p>No coffee items found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Coffee Menu</h2>
      <div className="menu-grid">
        {filteredMenuItems.map(item => (
          <Link key={item.id} to={`/product/${item.id}`} className="menu-item-link">
            <div className="menu-item">
              {item.image && <img src={item.image} alt={item.name} className="item-image" />}
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="description">{item.description}</p>
              <p className="price">${item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;