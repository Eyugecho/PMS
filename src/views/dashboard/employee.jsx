import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { gridSpacing } from 'store/constant';
import PageContainer from 'ui-component/MainPage';
import TasksContainer from './components/TasksContainer';
import AssignedKPI from './components/AssignedKPI';

const EmployeeDashboard = () => {
  const [loading, setLoading] = useState({
    kpi: true,
    task: true,
    performance: true
  });

  const [error, setError] = useState({
    kpi: false,
    task: false,
    performance: false
  });

  const [data, setData] = useState({
    kpi: [],
    tasks: [],
    performance: []
  });

  return (
    <PageContainer title="Dashboard">
      <Grid container spacing={gridSpacing} sx={{ margin: 1 }}>
        <Grid item xs={11.6}>
          <Grid container spacing={gridSpacing} sx={{ display: 'flex', alignItems: 'center' }}>
            <AssignedKPI />
            <TasksContainer />
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EmployeeDashboard;
