import './NavBar.css'
import { NavLink } from 'react-router-dom'
import { useMenu } from './MenuContext'
import { useState } from 'react'

function NavBar() {
  const { setSearchTerm } = useMenu()
  const [localSearch, setLocalSearch] = useState('')

  const handleSearch = () => {
    setSearchTerm(localSearch)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search coffee..."
          className="search-input"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-btn" onClick={handleSearch}>🔍</button>
      </div>
      <NavLink to="/login" className="login-btn">Admin Login</NavLink>
    </nav>
  );
}

export default NavBar;