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
  IconLayoutSidebarInactive,
  IconCircleCheck,
  IconTimeDuration0,
  IconChecklist,
 
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
  IconLayoutSidebarInactive,
  IconCircleCheck,
  IconTimeDuration0,
  IconChecklist,
  
};

// ==============================|| menus  MENU ITEMS ||============================== //




const Menus = {
  id: 'Kpi_basic_config',
  title: 'Planning',
  type: 'group',
  // requiredRoles: ['Admin'],
  children: [
    {
      id: 'authentication',
      title: 'KPI Managment',
      type: 'collapse',
      icon: icons.IconFileReport,
      children: [
        {
          id: 'kpi',
          title: 'Register KPI',
          type: 'item',
          url: '/kpi/kpi-managment'
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
