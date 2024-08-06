import React from 'react';
import { Box, Typography } from '@mui/material';

export const DetailInfo = ({ icon, label, info }) => {
  return (
    <Box sx={{ display: 'flex', marginY: 2 }}>
      {icon}
      <Box sx={{ marginLeft: 2 }}>
        <Typography variant="h5">{info}</Typography>
        <Typography variant="subtitle2">{label}</Typography>
      </Box>
    </Box>
  );
};
