import React from 'react';
import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import DrogaCard from 'ui-component/cards/DrogaCard';
import PropTypes from 'prop-types';
import TaskProgress from './TaskProgress';
import { getStatusColor } from 'utils/function';

const TaskCard = ({ type, status, title, description, image, username, position, step, date, onPress }) => {
  const theme = useTheme();
  const belowMd = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <DrogaCard
      sx={{
        margin: 1,
        width: belowMd ? '98%' : '47.5%',
        ':hover': { transform: 'scale(1.02)', transition: 'all 0.2s ease-in-out', cursor: 'pointer' }
      }}
      onPress={onPress}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1.6 }}>
        <Box sx={{ borderRadius: 12, backgroundColor: theme.palette.grey[50], px: 1.4, py: 0.4 }}>
          <Typography variant="body2" color={theme.palette.text.primary} sx={{ textTransform: 'capitalize' }}>
            {type}
          </Typography>
        </Box>
        <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', color: getStatusColor(status) }}>
          {status}
        </Typography>
      </Box>

      <Typography variant="h3" color={theme.palette.text.primary}>
        {title}
      </Typography>
      <Typography variant="body2" color={theme.palette.text.primary} marginTop={0.6}>
        {description}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 3 }}>
        <Box sx={{ width: '14%', marginTop: 0.8 }}>
          <Avatar sx={{ width: 32, height: 32 }} src={image} alt={username} />
        </Box>

        <Box sx={{ width: '86%' }}>
          <Typography variant="subtitle1" color={theme.palette.text.primary}>
            {username}
          </Typography>
          <Typography variant="subtitle2">{position}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TaskProgress numberOfSteps={step} status={status} />

            <Typography variant="subtitle2">{date}</Typography>
          </Box>
        </Box>
      </Box>
    </DrogaCard>
  );
};

TaskCard.propTypes = {
  type: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  username: PropTypes.string,
  position: PropTypes.string,
  step: PropTypes.number,
  date: PropTypes.string,
  onPress: PropTypes.func
};
export default TaskCard;
