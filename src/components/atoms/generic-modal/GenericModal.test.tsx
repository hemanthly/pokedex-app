// GenericModal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import GenericModal from './index';

describe('GenericModal', () => {
  const onClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the GenericModal component correctly when it is open', () => {
    render(
      <GenericModal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </GenericModal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument();
  });

  test('does not render the GenericModal component when it is closed', () => {
    render(
      <GenericModal isOpen={false} onClose={onClose}>
        <div>Modal Content</div>
      </GenericModal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('closes the modal when the close button is clicked', () => {
    render(
      <GenericModal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </GenericModal>
    );

    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('closes the modal when the Escape key is pressed', () => {
    render(
      <GenericModal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </GenericModal>
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('applies custom classes and styles correctly', () => {
    const customClasses = 'custom-class';
    const customStyles = { backgroundColor: 'red' };

    render(
      <GenericModal
        isOpen={true}
        onClose={onClose}
        customClasses={customClasses}
        customStyles={customStyles}
      >
        <div>Modal Content</div>
      </GenericModal>
    );

    const modalElement = screen.getByText('Modal Content').parentElement?.parentElement;
    expect(modalElement).toHaveClass(customClasses);
    expect(modalElement).toHaveStyle('background-color: red');
  });
});
