import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Menu from '../components/Menu';

// Mock the fetch function
global.fetch = jest.fn();

describe('Menu Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('displays loading initially', () => {
    fetch.mockImplementationOnce(() => new Promise(() => {})); // Never resolves
    render(<Menu />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays menu items after successful fetch', async () => {
    const mockMenuItems = [
      { id: 1, name: 'Espresso', price: 3.50 },
      { id: 2, name: 'Latte', price: 4.00 },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMenuItems,
    });

    render(<Menu />);

    await waitFor(() => {
      expect(screen.getByText('Coffee Menu')).toBeInTheDocument();
    });

    expect(screen.getByText('Espresso - $3.5')).toBeInTheDocument();
    expect(screen.getByText('Latte - $4')).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Menu />);

    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });

  test('displays error message on non-ok response', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<Menu />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch menu')).toBeInTheDocument();
    });
  });
});