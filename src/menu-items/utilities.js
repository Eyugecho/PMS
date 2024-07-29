// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill,IconTarget,IconReport } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconTarget,
  IconReport,
  
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Dashboards',
  type: 'group',
  children: [
    {
      id: 'target-dashboard',
      title: 'Target Dashboard',
      type: 'item',
      // url: '/utils/util-typography',
      icon: icons.IconTarget,
      breadcrumbs: false
    },
    {
      id: 'cpr-dashboard',
      title: 'CPR Dashboard',
      type: 'item',
      // url: '/utils/util-color',
      icon: icons.IconReport,
      breadcrumbs: false
    },
    {
      id: 'evaluation-dashboard',
      title: 'Evaluation Dashboard',
      type: 'item',
      // url: '/utils/user-creation',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'pip-dashboard',
      title: 'PIP Dashboard',
      type: 'item',
      // url: '/utils/user-creation',
      icon: icons.IconShadow,
      breadcrumbs: false
    },

  ]
};

export default utilities;
