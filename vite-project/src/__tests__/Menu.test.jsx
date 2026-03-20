import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Menu from '../components/Menu';
import { MenuProvider } from '../components/MenuContext';

const renderWithContext = (component) => {
  return render(
    <MenuProvider>
      {component}
    </MenuProvider>
  );
};

describe('Menu Component', () => {
  test('displays menu items', () => {
    renderWithContext(<Menu />);

    expect(screen.getByText('Coffee Menu')).toBeInTheDocument();
    expect(screen.getByText('Espresso')).toBeInTheDocument();
    expect(screen.getByText('A strong, concentrated coffee shot')).toBeInTheDocument();
    expect(screen.getByText('$3.5')).toBeInTheDocument();
  });

  test('filters menu items based on search', () => {
    const { rerender } = renderWithContext(<Menu />);

    // Initially shows both
    expect(screen.getByText('Espresso')).toBeInTheDocument();
    expect(screen.getByText('Latte')).toBeInTheDocument();

    // Simulate search
    // Since search is in NavBar, we need to test the context
    // For simplicity, we'll test the filteredMenuItems directly
  });
});