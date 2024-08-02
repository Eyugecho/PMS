import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const PageContainer = ({ back, title, rightOption, children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Grid container>
      <Grid
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          paddingY: 2,
          paddingX: 2.4
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {back && (
            <IconButton onClick={() => navigate(-1)}>
              <IconArrowLeft size={20} />{' '}
            </IconButton>
          )}

          <Typography variant="h4" sx={{ marginLeft: 2 }}>
            {title ? title : 'No title'}
          </Typography>
        </Box>

        <Box>{rightOption}</Box>
      </Grid>

      <Grid container>
        <Grid xs={12}>{children}</Grid>
      </Grid>
    </Grid>
  );
};

PageContainer.propTypes = {
  back: PropTypes.bool,
  title: PropTypes.string.isRequired,
  rightOption: PropTypes.node,
  children: PropTypes.node
};

export default PageContainer;
