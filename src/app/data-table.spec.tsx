import { render, screen, act } from '@testing-library/react';
import { DataTable } from './data-table';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Tests', () => {
  it('should have searched license in the grid when user type a term', async () => {
    const user = userEvent.setup();
    render(<DataTable />);
    await act(async () => {
      await user.type(screen.getByTestId('debounced-input'), 'john');
    });

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane doe/i)).not.toBeInTheDocument();
    //
  });
});
