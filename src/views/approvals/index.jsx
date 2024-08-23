import React from 'react';
import { Grid, Typography } from '@mui/material';
import PageContainer from 'ui-component/MainPage';

const Approvals = () => {
  return (
    <PageContainer title="Approval Management">
      <Grid container>
        <Grid item={12} padding={3}>
          <Typography variant="subtitle1">Approvals page</Typography>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Approvals;
