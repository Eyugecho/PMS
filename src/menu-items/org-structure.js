// assets
import {
  IconBuildingSkyscraper,
  IconFileRss,
  IconUsersGroup
} from '@tabler/icons-react';
import {
  IconKey,
  IconABOff,
  IconFile3d
} from '@tabler/icons-react';
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
      requiredRole: 'Admin',
      type: 'item',
      url: '/employees',
      requiredRoles: ['Admin'],
      icon: icons.IconUsersGroup

    }
  ]
};
const auth = getRolesAndPermissionsFromToken()

export const getOrgStructure = () => {
  let childrenTemp = []

  childrenTemp.push({
    id: 'units',
    title: 'Units',
    type: 'item',
    icon: icons.IconBuildingSkyscraper,
    url: '/units'
  })

  auth.forEach(role => {
    console.log("---------->", role.permissions)


    if (role.permissions.find(per => per.name == "create:user")) {
      childrenTemp.push({
        id: 'employees',
        title: 'Employees',
        requiredRole: 'Admin',
        type: 'item',
        url: '/employees',
        icon: icons.IconUsersGroup

      })
    }
  })

  return {
    id: 'dep',
    title: 'Organization Structure',
    type: 'group',
    children: [



      ...childrenTemp


    ]
  }
}

export default OrgStructure;