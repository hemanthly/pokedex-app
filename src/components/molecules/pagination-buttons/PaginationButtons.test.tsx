import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaginationButtons from './index';
import { useMediaQuery, useTheme } from '@mui/material';
import Pagination from '@mui/material/Pagination';

// Mocking MUI components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
  useTheme: jest.fn(),
}));

describe('PaginationButtons', () => {
  const mockUseTheme = useTheme as jest.Mock;
  const mockUseMediaQuery = useMediaQuery as jest.Mock;

  const defaultProps = {
    currentPage: 1,
    hasNextPage: true,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      breakpoints: {
        down: (size: string) => size === 'sm',
      },
    });
  });

  it('renders the Pagination component with correct props', () => {
    mockUseMediaQuery.mockReturnValue(false); // Not mobile

    render(<PaginationButtons {...defaultProps} />);

    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'page 1' })).toBeInTheDocument();
  });

  it('calls onPageChange with correct page number', () => {
    mockUseMediaQuery.mockReturnValue(false); // Not mobile

    render(<PaginationButtons {...defaultProps} />);

    const nextButton = screen.getByRole('button', { name: 'Go to next page' });
    fireEvent.click(nextButton);

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('sets Pagination size to large on desktop', () => {
    mockUseMediaQuery.mockReturnValue(false); // Not mobile

    render(<PaginationButtons {...defaultProps} />);

    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveClass('MuiPagination-root MuiPagination-text css-1oj2twp-MuiPagination-root');
  });

  it('sets Pagination size to small on mobile', () => {
    mockUseMediaQuery.mockReturnValue(true); // Mobile

    render(<PaginationButtons {...defaultProps} />);

    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveClass('MuiPagination-root MuiPagination-text css-1oj2twp-MuiPagination-root');
  });
});
