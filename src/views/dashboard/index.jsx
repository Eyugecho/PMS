import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EmployeeDashboard from './employee';
import AdminDashboard from './admin';
import SuperAdminDashboard from './superadmin';

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

  if (roles.includes('Admin')) {
    return <AdminDashboard />;
  } else if (roles.includes('Manager')) {
    return <AdminDashboard />;
     } else if (roles.includes('Super_Admin')) {
    return <SuperAdminDashboard/>;
  } else if (roles.includes('Employee')) {
    return <EmployeeDashboard />;
  } else {
    return <EmployeeDashboard />;
  }
};

export default Dashboard;
