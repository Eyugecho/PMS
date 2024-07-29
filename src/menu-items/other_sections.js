// assets
import { IconDashboard,IconReport,IconShadow } from '@tabler/icons-react';

// constant
const icons = { IconDashboard ,IconReport,IconShadow};

// ==============================|| other_section  MENU ITEMS ||============================== //

const other_section = {
  id: 'other_sec',
  title: '',
  type: 'group',
  children: [
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
      id: 'role-define',
      title: 'Role Define For Cost Center',
      type: 'item',
      // url: '/utils/user-creation',
      icon: icons.IconReport,
      breadcrumbs: false
    },
    {
        id: 'role-revok',
        title: 'Role Revoke',
        type: 'item',
        // url: '/utils/user-creation',
        icon: icons.IconReport,
        breadcrumbs: false
      },
  ]
};

export default other_section;
