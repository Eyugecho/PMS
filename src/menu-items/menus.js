// assets
import {
  IconDashboard,
  IconReport,
  IconShadow,
  IconActivity,
  IconSettingsStar,
  IconFileReport,
  IconBrandCampaignmonitor,
  IconAdjustmentsHorizontal,
  IconFile3d,
  IconLayoutSidebarInactive
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
  IconBrandCampaignmonitor,
  IconFile3d,
  IconLayoutSidebarInactive
};

// ==============================|| menus  MENU ITEMS ||============================== //

const Menus = {
  id: 'Kpi_basic_config',
  title: 'Planning',
  type: 'group',
  // requiredRoles: ['Admin'],
  children: [
    // {
    //   id: 'basic-config',
    //   title: 'Pre-Setups',
    //   type: 'item',
    //   url: '/basic-config/basic-config-creation',
    //   icon: icons.IconSettingsStar

    //   // target: true
    // },
    {
      id: 'kpi',
      title: 'Kpi Managment',
      type: 'item',
      url: '/kpi/kpi-managment',
      icon: icons.IconFileReport,

      // target: true
    },


    {
      id: 'planning',
      title: 'Planning',
      type: 'item',
      icon: icons.IconAdjustmentsHorizontal,
      url: '/planning'
    },
    {
      id: 'eod_activity',
      title: 'EOD Activity',
      type: 'item',
      icon: icons.IconLayoutSidebarInactive,
      url: '/Eod/Eod-act'
    },
    {
      id: 'mointoring',
      title: 'Monitoring',
      type: 'collapse',
      url: 'monitoring/daily',
      icon: icons.IconBrandCampaignmonitor,
      children: [
        {
          id: 'daily-activity',
          title: 'Daily Activity',
          type: 'item',
          url: 'monitoring/daily'
        }
      ]
    },

    {
      id: 'evaluation',
      title: 'Evaluation',
      type: 'item',
      url: 'evaluation',
      icon: icons.IconChecklist
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
          url: '/approvals'
        },
        {
          id: 'feedbacks',
          title: 'Feedbacks',
          type: 'item',
          url: '/feedbacks'
        }
      ]
    },
    {
      id: 'grading-ranking',
      title: 'Grading & Ranking',
      type: 'item',
      url: '/ranking',
      icon: icons.IconReport
    }
  ]
};

export default Menus;
