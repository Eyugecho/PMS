// assets
import { IconKey, IconABOff } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconABOff
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const dep = {
  id: 'dep',
  title: 'Departments',
  // caption: 'Pages Caption',
  type: 'group',
  // requiredRoles: ['Admin'],

  children: [
    {
      id: 'department-creation',
      title: 'Units',
      type: 'item',
      icon: icons.IconKey,
      url: '/units'
    }
  ]
};

export default dep;
