// assets
import { IconBuildingSkyscraper, IconFileRss, IconUsersGroup } from '@tabler/icons-react';
import { IconKey, IconABOff, IconFile3d } from '@tabler/icons-react';

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

const OrgStructure = {
  id: 'dep',
  title: 'Organization Structure',
  type: 'group',
  children: [
    {
      id: 'units',
      title: 'Units',
      type: 'item',
      icon: icons.IconBuildingSkyscraper,
      url: '/units'
    },
    {
      id: 'employees',
      title: 'Employees',
      type: 'item',
      url: '/employees',
      icon: icons.IconUsersGroup
    }
  ]
};

export default OrgStructure;
