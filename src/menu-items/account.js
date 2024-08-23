// assets
import {
  IconKey,
  IconUserCog
} from '@tabler/icons-react';
import getRolesAndPermissionsFromToken from 'utils/auth/getRolesAndPermissionsFromToken';

// constant
const icons = {
  IconKey,
  IconUserCog
};

// ==============================|| USER MANAGEMENT MENU ITEMS ||============================== //
const auth = getRolesAndPermissionsFromToken()

export const Accounts = () => {
  let childrenTemp = []


  auth.forEach(role => {



    if (role.permissions.find(per => per.name == "read:users")) {
      childrenTemp.push({
        id: 'users',
        title: 'Users',
        type: 'item',
        url: 'placeholder'
      }, )
    }
  })

  auth.forEach(role => {



    if (role.permissions.find(per => per.name == "read:roles") || role.permissions.find(per => per.name === "read:permissions")) {
      childrenTemp.push({
        id: 'role',
        title: 'Role and Permission',
        type: 'item',
        url: '/rolePermission'

      }, )
    }
  })

  childrenTemp.push({
    id: 'reset-password',
    title: 'Password Reset',
    type: 'item',
    url: '/reset/reset-password'

  }, )
  return {
    id: 'accounts',
    title: 'Account Managment',
    type: 'group',
    children: [{
        id: 'user-accounts',
        title: 'User Accounts',
        type: 'collapse',
        icon: icons.IconUserCog,
        children: [


          ...childrenTemp
        ]
      }


    ]
  }
}



