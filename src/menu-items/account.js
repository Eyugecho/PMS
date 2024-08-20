// assets
import { IconKey, IconUserCog } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconUserCog
};

// ==============================|| USER MANAGEMENT MENU ITEMS ||============================== //

const Accounts = {
  id: 'accounts',
  title: 'Account Managment',
  type: 'group',

  children: [
    {
      id: 'user-accounts',
      title: 'User Accounts',
      type: 'collapse',
      icon: icons.IconUserCog,

      children: [
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          url: 'placeholder'
        },
        {
          id: 'role',
          title: 'Role and Permission',
          type: 'item',
          url: '/rolePermission'
        },

        {
          id: 'reset-password',
          title: 'Password Reset',
          type: 'item',
          url: '/reset/reset-password'
        }
      ]
    }
  ]
};

export default Accounts;
