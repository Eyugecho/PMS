import {} from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, useTheme } from '@mui/material';

const DrogaCard = ({ sx, children }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: 2,
        border: 0.8,
        borderColor: theme.palette.divider,
        ...sx
      }}
    >
      {children}
    </Paper>
  );
};

DrogaCard.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node
};
export default DrogaCard;
