import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EmployeeDashboard from './employee';
import SuperAdminDashboard from './superadmin';
import { Grid, Typography } from '@mui/material';

// ==============================|| HOME DASHBOARD ||============================== //

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [roles, setRoles] = useState(['Employee']);

  useEffect(() => {
    if (user && user.roles) {
      const updatedRoles = user.roles.map((role) => role.name);
      setRoles(updatedRoles);
    }
  }, [user]);

  // if (roles.includes('Super_Admin')) {
  //   return <SuperAdminDashboard />;
  // } else {
  //   return <EmployeeDashboard />;
  // }

  return <SuperAdminDashboard />;
  // return (
  //   <Grid container>
  //     <Grid item xs={12}>
  //       <Typography variant="h4">Dashboard</Typography>
  //     </Grid>
  //   </Grid>
  // );
};

export default Dashboard;
