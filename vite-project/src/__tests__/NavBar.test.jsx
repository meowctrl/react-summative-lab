import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { MenuProvider } from '../components/MenuContext';

const renderWithProviders = (component) => {
  return render(
    <MenuProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </MenuProvider>
  );
};

describe('NavBar Component', () => {
  test('renders navigation links', () => {
    renderWithProviders(<NavBar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Admin Login')).toBeInTheDocument();
  });

  test('links have correct href attributes', () => {
    renderWithProviders(<NavBar />);
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Shop').closest('a')).toHaveAttribute('href', '/shop');
    expect(screen.getByText('Admin Login').closest('a')).toHaveAttribute('href', '/login');
  });

  test('navbar has correct class', () => {
    renderWithProviders(<NavBar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('navbar');
  });

  test('search input and button are present', () => {
    renderWithProviders(<NavBar />);
    expect(screen.getByPlaceholderText('Search coffee...')).toBeInTheDocument();
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });
});