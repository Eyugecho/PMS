// assets
import { IconKey, IconUserCog } from '@tabler/icons-react';
import getRolesAndPermissionsFromToken from 'utils/auth/getRolesAndPermissionsFromToken';

// constant
const icons = {
  IconKey,
  IconUserCog
};

// ==============================|| USER MANAGEMENT MENU ITEMS ||============================== //
const auth = getRolesAndPermissionsFromToken();

export const Accounts = () => {
  let childrenTemp = [];

  auth &&
    auth.forEach((role) => {
      if (role.permissions.find((per) => per.name == 'read:roles') || role.permissions.find((per) => per.name === 'read:permissions')) {
        childrenTemp.push({
          id: 'role',
          title: 'Role and Permission',
          type: 'item',
          icon: icons.IconKey,
          url: '/role-permission'
        });
      }
    });

    auth &&
      auth.forEach((role) => {
        if (role.permissions.find((per) => per.name == 'read:user')) {
          childrenTemp.push({
            id: 'users',
            title: 'Users',
            requiredRole: 'Admin',
            type: 'item',
            url: '/users',
            icon: icons.IconUserCog
          });
        }
      });

  return {
    id: 'account',
    title: 'Account',
    type: 'group',
 icon: icons.IconUserCog,
    children: [...childrenTemp]
  };
};
