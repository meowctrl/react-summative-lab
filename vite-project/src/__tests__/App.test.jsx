import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { MenuProvider } from '../components/MenuContext';

const renderApp = () => {
  return render(
    <MenuProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MenuProvider>
  );
};

describe('App Component', () => {
  test('renders navbar on all routes', () => {
    renderApp();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Admin Portal')).toBeInTheDocument();
  });

  test('renders welcome message on home route', () => {
    renderApp();
    expect(screen.getByText('Welcome to Brew Haven')).toBeInTheDocument();
  });
});