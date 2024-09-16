import React from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import PageContainer from 'ui-component/MainPage';
import TasksContainer from './components/TasksContainer';
import AssignedKPI from './components/AssignedKPI';
import OverallPerformance from './components/OverallPerformance';

const EmployeeDashboard = () => {
  return (
    <PageContainer title="Home">
      <Grid container spacing={gridSpacing} sx={{ margin: 1 }}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <TasksContainer />
            <AssignedKPI />
            <OverallPerformance />
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EmployeeDashboard;
