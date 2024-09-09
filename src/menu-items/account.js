// assets
import {
  IconKey,
  IconUserCog
} from '@tabler/icons-react';
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
      if (role.permissions.find((per) => per.name == 'read:users')) {
        childrenTemp.push({
          id: 'users',
          title: 'Users',
          type: 'item',
          url: 'placeholder'
        });
      }
    });

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

  return {
    id: 'account',
    title: 'Account',
    type: 'group',

    children: [...childrenTemp]

  };
};