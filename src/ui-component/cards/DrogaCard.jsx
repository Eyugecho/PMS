import React from 'react';
import { Paper, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const DrogaCard = ({ sx, onPress, children }) => {
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
      onClick={onPress}
    >
      {children}
    </Paper>
  );
};

DrogaCard.propTypes = {
  sx: PropTypes.object,
  onPress: PropTypes.func,
  children: PropTypes.node
};
export default DrogaCard;
