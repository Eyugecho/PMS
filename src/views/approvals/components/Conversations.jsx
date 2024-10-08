import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { commentsData } from 'data/approval/comments';
import { IconPlus } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import Comment from './Comment';
import Fallbacks from 'utils/components/Fallbacks';
import DrogaButton from 'ui-component/buttons/DrogaButton';

const Conversations = ({ loading, conversation }) => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Box sx={{ paddingRight: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 0.4,
            borderColor: theme.palette.divider,
            paddingBottom: 1.8
          }}
        >
          <Typography variant="h4">Conversations</Typography>

          <DrogaButton variant="outlined" title={'Add comment'} icon={<IconPlus size="1.2rem" stroke="1.4" />} />
        </Box>
        {loading ? (
          <Grid container sx={{ minHeight: 400 }}>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
              <ActivityIndicator size={20} />
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ paddingTop: 2 }}>
            {commentsData.length === 0 ? (
              <Fallbacks severity="conversation" title={``} description={`There is no conversation yet`} sx={{ paddingTop: 6 }} size={80} />
            ) : (
              //   commentsData.map((item, index) => (
              //     <Comment
              //       key={index}
              //       profile={item.employee?.profile}
              //       name={item.employee?.user?.name}
              //       date_time={item.date_time}
              //       user_comment={item.comment}
              //     />
              //   ))

              commentsData.map((item, index) => (
                <Comment key={index} profile={item?.profile} name={item.name} date_time={item.date_time} user_comment={item.user_comment} />
              ))
            )}
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
};

Conversations.propTypes = {
  employee: PropTypes.oneOf([PropTypes.array, PropTypes.object])
};

export default Conversations;
