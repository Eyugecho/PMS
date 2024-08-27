import React from 'react';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import PageContainer from 'ui-component/MainPage';
import DrogaCard from 'ui-component/cards/DrogaCard';

const ViewTask = () => {
  return (
    <PageContainer back={true} title="Task Detail">
      <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={10} padding={4}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
              <DrogaCard>
                <Typography variant="body2">Task detail page</Typography>
              </DrogaCard>
            </Grid>

            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <DrogaCard>
                <Typography variant="body2">Task detail page</Typography>
              </DrogaCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ViewTask;
