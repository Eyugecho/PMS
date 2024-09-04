// assets
import {
  IconChartInfographic,
  IconZoomScan
} from '@tabler/icons-react';

// constant
const icons = {
  IconZoomScan,
  IconChartInfographic
};

// ==============================|| REPORT AND ANALYSIS MENU ITEMS ||============================== //

const ReportsAndAnalysis = {
  id: 'reports',
  title: 'Reports & Analysis',
  type: 'group',
  children: [{
      id: 'reporting',
      title: 'Reports',
      type: 'collapse',
      icon: icons.IconChartInfographic,
      children: [{
          id: 'report',
          title: 'Report',
          type: 'item',
          url: 'report',
          breadcrumbs: false
        },
        {
          id: 'cpr-report',
          title: 'CPR Report',
          type: 'item',
          url: 'placeholder',
          breadcrumbs: false
        },
        {
          id: 'pip-report',
          title: 'PIP Report',
          type: 'item',
          url: 'placeholder',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'analysis',
      title: 'Analysis',
      type: 'collapse',
      icon: icons.IconZoomScan,
      children: [{
          id: 'target-dashboard',
          title: 'Target Dashboard',
          type: 'item',
          url: 'placeholder',
          breadcrumbs: false
        },
        {
          id: 'cpr-dashboard',
          title: 'CPR Dashboard',
          type: 'item',
          url: 'placeholder',
          breadcrumbs: false
        },
        {
          id: 'evaluation-dashboard',
          title: 'Evaluation Dashboard',
          type: 'item',
          url: 'placeholder',
          breadcrumbs: false
        },
        {
          id: 'pip-dashboard',
          title: 'PIP Dashboard',
          type: 'item',
          url: 'placeholder',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default ReportsAndAnalysis;