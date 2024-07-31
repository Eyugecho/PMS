// assets
import { IconKey,IconUser } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconUser

};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Employee',
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
          id: 'usermanage',
          title: 'Employee Management',
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
          id: 'check-employee',
          title: 'Check Employee Target',
          type: 'item',
          // url: '/utils/util-typography',
          icon: icons.IconReport,
    
          breadcrumbs: false,
        },
        {
          id: 'search-employee',
          title: 'Search Employee',
          type: 'item',
          // url: '/utils/util-color',
          icon: icons.IconReport,
    
          breadcrumbs: false
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
