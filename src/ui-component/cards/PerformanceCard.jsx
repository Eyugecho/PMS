import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import DrogaDonutChart from 'ui-component/charts/DrogaDonutChart';
import PropTypes from 'prop-types';

const PerformanceCard = ({ performance, frequency }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
      <DrogaDonutChart value={performance} />

      <Typography variant="h4" sx={{ textTransform: 'capitalize', color: theme.palette.text.primary, marginTop: 1 }}>
        {frequency}
      </Typography>

      <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
        Performance
      </Typography>

      {performance == 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ width: 6, height: 6, borderRadius: 2, backgroundColor: theme.palette.warning.dark, marginRight: 0.6 }}></Box>
          <Typography variant="subtitle2">upcoming</Typography>
        </Box>
      )}
    </Box>
  );
};

PerformanceCard.propTypes = {
  performance: PropTypes.number,
  frequency: PropTypes.string
};

export default PerformanceCard;
