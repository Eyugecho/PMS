import React from 'react';
import PageContainer from 'ui-component/MainPage';
import { Grid, IconButton, useTheme } from '@mui/material';
import { IconDotsVertical } from '@tabler/icons-react';

const CreatePlan = () => {
  const theme = useTheme();
  return (
    <div>
      <PageContainer
        back={true}
        title="Create New Plan"
        rightOption={
          <IconButton>
            <IconDotsVertical size={20} />
          </IconButton>
        }
      >
        <Grid
          container
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 2,
            marginTop: 2,
            paddingY: 3,
            paddingX: 2
          }}
        >
          <Grid container sx={{ minHeight: '60dvh' }}>
            <Grid xs={12}></Grid>
          </Grid>
        </Grid>
      </PageContainer>
    </div>
  );
};

export default CreatePlan;
