// assets
import { IconDashboard,IconReport,IconShadow } from '@tabler/icons-react';

// constant
const icons = { IconDashboard ,IconReport,IconShadow};

// ==============================|| Section 1 MENU ITEMS ||============================== //

const report = {
  id: 'reports',
  title: 'Reports',
  type: 'group',
  children: [
    {
      id: 'generic-report',
      title: 'Generic Report',
      type: 'item',
      // url: '/utils/util-typography',
      icon: icons.IconReport,

      breadcrumbs: false
    },
    {
      id: 'cpr-report',
      title: 'CPR Report',
      type: 'item',
      // url: '/utils/util-color',
      icon: icons.IconReport,

      breadcrumbs: false
    },
    {
      id: 'pip-report',
      title: 'PIP Report',
      type: 'item',
      // url: '/utils/user-creation',
      icon: icons.IconReport,
      breadcrumbs: false
    },
    
  ]
};

export default report;
