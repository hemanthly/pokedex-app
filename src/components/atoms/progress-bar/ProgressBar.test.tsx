import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from './index';

describe('ProgressBar Component', () => {
  it('renders label and value correctly', () => {
    const { getByText } = render(<ProgressBar label="Progress" value={50} />);

    // Check if label is rendered
    expect(getByText('Progress')).toBeInTheDocument();

    // Check if value is rendered
    expect(getByText('50')).toBeInTheDocument();
  });

});
