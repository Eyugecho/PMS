import React from 'react';
import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const Comment = ({ profile, name, position, date_time, user_comment }) => {
  const theme = useTheme();
  return (
    <Grid container margin={1.4}>
      <Grid item xs={2}>
        <Avatar src={profile} sx={{ height: 36, width: 36 }} />
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" color={theme.palette.text.primary}>
              {name}
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              {position}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginY: 1.4 }}>
          <Typography variant="subtitle1" color={theme.palette.text.primary}>
            {user_comment}
          </Typography>

          <Typography variant="subtitle2" color={theme.palette.text.secondary} sx={{ marginTop: 1.2 }}>
            {date_time}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

Comment.propTypes = {
  profile: PropTypes.string,
  name: PropTypes.string,
  date_time: PropTypes.string,
  user_comment: PropTypes.string
};

export default Comment;
