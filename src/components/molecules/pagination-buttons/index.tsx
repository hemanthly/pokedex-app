import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useMediaQuery, useTheme } from '@mui/material';

interface PaginationButtonsProps {
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ currentPage, hasNextPage, onPageChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="flex justify-center py-10">
      <Pagination
        count={56}
        // count={hasNextPage ? currentPage + 1 : currentPage}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        color="secondary"
        size={isMobile ? "small" : "large"}
        boundaryCount={2}
      />
    </div>
  );
};

export default PaginationButtons;
