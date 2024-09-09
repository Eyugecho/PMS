import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { IconNotification } from '@tabler/icons-react';
import DrogaCard from 'ui-component/cards/DrogaCard';
import PropTypes from 'prop-types';

const NotificationCard = ({ title, description, time }) => {
  const theme = useTheme();
  return (
    <DrogaCard sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: theme.palette.grey[50],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <IconNotification size="1.2rem" stroke="1.6" />
      </Box>
      <Box sx={{ width: '87%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: 2 }}>
        <Box sx={{ width: '80%' }}>
          <Typography variant="h4" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Sales unit is has new plan
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Revenue growth KPI, weighted 70%, and targettted, 400 Million in revenue
          </Typography>
        </Box>

        <Typography variant="body2">23 min ago</Typography>
      </Box>
    </DrogaCard>
  );
};

NotificationCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  time: PropTypes.string
};
export default NotificationCard;
