// assets
import {
  IconHome,
  IconHome2, // Icon for the main Home menu
  IconDashboard // Import a different icon for the Dashboard submenu
} from '@tabler/icons-react';

// constant
const icons = {
  IconHome,
  IconHome2,
  IconDashboard // New icon added for the Dashboard submenu
};

import getRolesAndPermissionsFromToken from 'utils/auth/getRolesAndPermissionsFromToken';

// ==============================|| HOME MENU ITEM ||============================== //
const auth = getRolesAndPermissionsFromToken();

export const home = () => {
  let childrenTemp = [];

  childrenTemp.push({
    id: 'default',
    title: 'Dashboard',
    type: 'item',
    url: '/',
    icon: icons.IconDashboard,
    breadcrumbs: false
  });

  return {
    id: 'home',
    title: 'Home',
    type: 'group',
    url: '/',
    icon: icons.IconHome2,
    children: [...childrenTemp]
  };
};
