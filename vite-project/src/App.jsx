import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Menu from './components/Menu';
import Admin from './components/Admin';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import { MenuProvider } from './components/MenuContext';
import './App.css';

function App() {
  return (
    <MenuProvider>
      <Router>
        <div className="App">
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Menu />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </MenuProvider>
  );
}

export default App;
