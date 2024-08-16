import {} from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';

const DrogaCard = ({ sx, children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: 2,
        border: 0.8,
        borderColor: theme.palette.divider,
        borderRadius: theme.shape.borderRadius,
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

DrogaCard.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node
};
export default DrogaCard;
