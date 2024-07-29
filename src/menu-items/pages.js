// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Account Management',
  // caption: 'Pages Caption',
  type: 'group',
  // requiredRoles: ['Admin'],
  
  children: [
    {
      id: 'authentication',
      title: 'Account',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'usermanage',
          title: 'User Management',
          type: 'item',
          url: '/utils/user-creation',
          // target: true
        },  
        {
          id: 'role',
          title: 'Role',
          type: 'item',
          url: '/role/role-creation',
          // target: true
        },
        {
          id: 'permission',
          title: 'Privilege',
          type: 'item',
          url: '/previlage/previlage-creation',
          // target: true
        },
        {
          id: 'units',
          title: 'Departments',
          type: 'item',
          url: '/units/units-creation',
          // target: true
        },
       
        {
          id: 'login3',
          title: 'Password Reset',
          type: 'item',
          url: '/reset/reset-password',
          // target: true
        },
      ]
    }
  ]
};

export default pages;
