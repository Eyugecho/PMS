import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { hasRole, hasPermission } from '../../../../store/permissionUtils';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';


const MenuList = () => {
  const user = useSelector((state) => state.user); // assuming user data is in the Redux storelog

  console.log(user);
  


  const filterMenuItems = (items) => {
    return items
      .map((item) => {
        if (item.type === 'group') {
          if (item.requiredRoles && !hasRole(user.roles, item.requiredRoles)) {
            return null;
          }
          const filteredChildren = filterMenuItems(item.children);
          if (filteredChildren.length > 0) {
            return { ...item, children: filteredChildren };
          }
          return null;
        }
        if (item.requiredRoles && !hasRole(user.roles, item.requiredRoles)) {
          return null;
        }
        if (item.requiredPermissions && !hasPermission(user.roles, item.requiredPermissions)) {
          return null;
        }
        return item;
      })
      .filter((item) => item !== null);
  };

  const filteredNavItems = filterMenuItems(menuItem.items);

  const navItems = filteredNavItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
