// assets
import { IconKey,IconABOff } from '@tabler/icons-react';

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
      title: 'Departments',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
            id: 'units',
            title: 'Departments',
            type: 'item',
            url: '/units/units-creation',
            // target: true
          },
       
      ]
      
    }
    
  ]
};

export default dep;
