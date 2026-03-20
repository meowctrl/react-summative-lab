import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
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

describe('ProductDetail Component', () => {
  test('displays product details for valid id', () => {
    // Mock useParams
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({ id: '1' }),
    }));

    renderWithProviders(<ProductDetail />);

    expect(screen.getByText('Espresso')).toBeInTheDocument();
    expect(screen.getByText('A strong, concentrated coffee shot')).toBeInTheDocument();
    expect(screen.getByText('$3.5')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Espresso' })).toBeInTheDocument();
  });

  test('displays not found for invalid id', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({ id: '999' }),
    }));

    renderWithProviders(<ProductDetail />);

    expect(screen.getByText('Product not found')).toBeInTheDocument();
  });
});