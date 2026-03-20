import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Admin from '../components/Admin';
import { MenuProvider } from '../components/MenuContext';

const renderWithContext = (component) => {
  return render(
    <MenuProvider>
      {component}
    </MenuProvider>
  );
};

describe('Admin Component', () => {
  test('renders login form initially', () => {
    renderWithContext(<Admin />);
    expect(screen.getByText('Admin Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('logs in with correct credentials', async () => {
    renderWithContext(<Admin />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Admin Portal')).toBeInTheDocument();
    });
  });

  test('shows alert on incorrect credentials', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithContext(<Admin />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(alertMock).toHaveBeenCalledWith('Invalid credentials');
    alertMock.mockRestore();
  });

  test('displays current menu after login', async () => {
    renderWithContext(<Admin />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Current Menu')).toBeInTheDocument();
      expect(screen.getByText('Espresso')).toBeInTheDocument();
      expect(screen.getByText('A strong, concentrated coffee shot')).toBeInTheDocument();
    });
  });

  test('adds new item to menu', async () => {
    renderWithContext(<Admin />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Add New Item')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Item Name'), { target: { value: 'Cappuccino' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '4.50' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Espresso with steamed milk and foam' } });
    fireEvent.change(screen.getByDisplayValue(''), { target: { value: 'cappuccino' } }); // category select
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));

    expect(screen.getByText('Cappuccino')).toBeInTheDocument();
    expect(screen.getByText('Espresso with steamed milk and foam')).toBeInTheDocument();
  });

  test('logs out successfully', async () => {
    renderWithContext(<Admin />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Admin Portal')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(screen.getByText('Admin Login')).toBeInTheDocument();
  });

  test('edits existing item', async () => {
    renderWithContext(<Admin />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    await waitFor(() => {
      expect(screen.getByText('Edit Item')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue('Espresso'), { target: { value: 'Double Espresso' } });
    fireEvent.click(screen.getByRole('button', { name: /update item/i }));

    expect(screen.getByText('Double Espresso')).toBeInTheDocument();
  });
});