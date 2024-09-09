// assets
import { IconBuildingSkyscraper, IconFileRss, IconUsersGroup } from '@tabler/icons-react';
import { IconKey, IconABOff, IconFile3d } from '@tabler/icons-react';
import getRolesAndPermissionsFromToken from 'utils/auth/getRolesAndPermissionsFromToken';

// constant
const icons = {
  IconKey,
  IconABOff,
  IconFile3d,
  IconFileRss,
  IconBuildingSkyscraper,
  IconUsersGroup
};

// ==============================|| ORGANIZATION PAGES MENU ITEMS ||============================== //

const auth = getRolesAndPermissionsFromToken();

export const getOrgStructure = () => {
  let childrenTemp = [];
  auth &&
    auth.forEach((role) => {
      if (role.permissions.find((per) => per.name == 'read:unit')) {
        childrenTemp.push({
          id: 'units',
          title: 'Units',
          type: 'item',
          icon: icons.IconBuildingSkyscraper,
          url: '/units'
        });
      }
    });

  auth &&
    auth.forEach((role) => {
      if (role.permissions.find((per) => per.name == 'read:employee')) {
        childrenTemp.push({
          id: 'employees',
          title: 'Employees',
          requiredRole: 'Admin',
          type: 'item',
          url: '/employees',
          icon: icons.IconUsersGroup
        });
      }
    });

  return {
    id: 'dep',
    title: 'Organization Structure',
    type: 'group',
    children: [...childrenTemp]
  };
};
