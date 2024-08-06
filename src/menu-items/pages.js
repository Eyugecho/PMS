// assets
import { IconKey, IconUser } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconUser
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Account Managment',
  // caption: 'Pages Caption',
  type: 'group',
  // requiredRoles: ['Admin'],

  children: [
    {
      id: 'authentication',
      title: 'Account',
      type: 'collapse',
      icon: icons.IconUser,

      children: [
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          url: 'placeholder'
        },
        {
          id: 'role',
          title: 'Role',
          type: 'item',
          url: '/role/role-creation'
        },
        {
          id: 'permission',
          title: 'Privilege',
          type: 'item',
          url: '/previlage/previlage-creation'
        },

        {
          id: 'login3',
          title: 'Password Reset',
          type: 'item',
          url: '/reset/reset-password'
          // target: true
        }
      ]
    }
  ]
};

export default pages;
