import React from 'react';
import { Grid, Typography } from '@mui/material';
import PageContainer from 'ui-component/MainPage';

const ViewEmployee = () => {
  return (
    <PageContainer back={true} title="Employee Details">
      <Grid container>
        <Grid item xs={12}>
          <Typography>Employee Details</Typography>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ViewEmployee;
