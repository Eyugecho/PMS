// assets
import { IconBuildingSkyscraper, IconFileRss, IconPrison, IconUserCog, IconUsersGroup } from '@tabler/icons-react';
import { IconKey, IconABOff,IconFile3d } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconABOff,
  IconFile3d,
  IconFileRss,
  IconBuildingSkyscraper,
  IconUsersGroup

};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const dep = {
  id: 'dep',
  title: 'Organaization Structure',
  // caption: 'Pages Caption',
  type: 'group',
  // requiredRoles: ['Admin'],

  children: [
    {
      id: 'department-creation',
      title: 'Units',
      type: 'item',
      icon: icons.IconBuildingSkyscraper,
      url: '/units'
    },
    {
      id: 'usermanage',
      title: 'Employee Management',
      type: 'item',
      url: '/utils/user-creation',
      icon: icons.IconUsersGroup,

      // target: true
    },  
  ]
};

export default dep;
