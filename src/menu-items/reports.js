// assets
import { IconDashboard,IconReport,IconShadow,IconActivity,IconReportAnalytics } from '@tabler/icons-react';

// constant
const icons = { IconDashboard ,IconReport,IconShadow,IconActivity,IconReportAnalytics};

// ==============================|| Section 1 MENU ITEMS ||============================== //

const report = {
  id: 'reports',
  title: 'Reports & Analysis',
  type: 'group',
  children: [
    {
      id: 'reporting',
      title: 'Reports',
      type: 'collapse',
      icon: icons.IconActivity,
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
  },
  {
    id: 'analysising',
    title: 'Analysis',
    type: 'collapse',
    icon: icons.IconReportAnalytics,
    children: [
      {
        id: 'target-dashboard',
        title: 'Target Dashboard',
        type: 'item',
        // url: '/utils/util-typography',
        icon: icons.IconReport,
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
},
   
    
  ]
};

export default report;
