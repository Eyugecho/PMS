import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export const DetailInfo = ({ icon, label, info }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginY: 2 }}>
      {icon}
      <Box sx={{ marginLeft: 2 }}>
        <Typography variant="subtitle1" color={theme.palette.text.primary}>
          {info}
        </Typography>
        <Typography variant="subtitle2">{label}</Typography>
      </Box>
    </Box>
  );
};
