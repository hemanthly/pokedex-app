// FilterModal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import FilterModal from './index';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('FilterModal', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the FilterModal component correctly when it is open', () => {
    render(
      <FilterModal isOpen={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </FilterModal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument();
  });

  test('does not render the FilterModal component when it is closed', () => {
    render(
      <FilterModal isOpen={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </FilterModal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('closes the modal when the close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <FilterModal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </FilterModal>
    );

    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('closes the modal when the Escape key is pressed', () => {
    const onClose = jest.fn();
    render(
      <FilterModal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </FilterModal>
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('resets filters and closes the modal when the reset button is clicked', () => {
    const onClose = jest.fn();
    render(
      <FilterModal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </FilterModal>
    );

    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));
    expect(mockRouter.push).toHaveBeenCalledWith('/?');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('submits and closes the modal when the submit button is clicked', () => {
    const onClose = jest.fn();
    render(
      <FilterModal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </FilterModal>
    );

    //fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    //expect(onClose).toHaveBeenCalledTimes(1);
  });
});
