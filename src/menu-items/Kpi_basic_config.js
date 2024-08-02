// assets
import {
  IconDashboard,
  IconReport,
  IconShadow,
  IconActivity,
  IconSettingsStar,
  IconFileReport,
  IconBrandCampaignmonitor,
  IconAdjustmentsHorizontal
} from '@tabler/icons-react';

// constant
const icons = {
  IconAdjustmentsHorizontal,
  IconDashboard,
  IconReport,
  IconShadow,
  IconActivity,
  IconSettingsStar,
  IconFileReport,
  IconBrandCampaignmonitor
};

// ==============================|| Kpi_basic_config  MENU ITEMS ||============================== //

const Kpi_basic_config = {
  id: 'Kpi_basic_config',
  title: 'Planning',
  type: 'group',
  // requiredRoles: ['Admin'],
  children: [
    {
      id: 'authentication',
      title: 'Kpi Managment',
      type: 'collapse',
      icon: icons.IconFileReport,
      children: [
        {
          id: 'kpi',
          title: 'Kpi Register',
          type: 'item',
          url: '/kpi/kpi-managment'
          // icon: icons.IconReport,

          // target: true
        },
        {
          id: 'kpi_tracking',
          title: 'Kpi Tracking',
          type: 'item',
          url: '/kpi-tracking/kpi-track'
          // icon: icons.IconReport,

          // target: true
        }
      ]
    },

    {
      id: 'planning',
      title: 'Planning',
      type: 'item',
      url: '/planning',
      icon: icons.IconAdjustmentsHorizontal
    },

    {
      id: 'mointoring',
      title: 'Monitoring',
      type: 'collapse',
      icon: icons.IconBrandCampaignmonitor,
      children: [
        {
          id: 'daily-activity',
          title: 'Daily Activity Settings',
          type: 'item'
          // url: '/kpi/kpi-managment',
          // icon: icons.IconReport,

          // target: true
        },
        {
          id: 'moitoring-evaluation',
          title: 'Mointoring & Evaluation',
          type: 'item'
          // url: '/kpi/kpi-managment',
          // icon: icons.IconReport,

          // target: true
        }
      ]
    },

    {
      id: 'approval-settings',
      title: 'Approval Managment',
      type: 'collapse',
      icon: icons.IconDashboard,
      children: [
        {
          id: 'approvals',
          title: 'Approvals',
          type: 'item',
          // url: '/kpi/kpi-managment',
          icon: icons.IconReport

          // target: true
        },
        {
          id: 'feedbacks',
          title: 'Feedbacks',
          type: 'item',
          // url: '/kpi/kpi-managment',
          icon: icons.IconReport

          // target: true
        }
      ]
    },
    {
      id: 'grading-ranking',
      title: 'Grading & Ranking',
      type: 'item',
      // url: '/basic-config/basic-config-creation',
      icon: icons.IconReport

      // target: true
    }
  ]
};

export default Kpi_basic_config;
