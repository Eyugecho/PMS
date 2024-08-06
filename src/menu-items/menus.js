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
  IconCircleCheck,
  IconTimeDuration0,
  IconChecklist
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
  IconCircleCheck,
  IconTimeDuration0,
  IconChecklist
};

// ==============================|| menus  MENU ITEMS ||============================== //

const Menus = {
  id: 'planning',
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
          url: 'placeholder'
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
          url: 'placeholder'
        },
        {
          id: 'feedbacks',
          title: 'Feedbacks',
          type: 'item',
          url: 'placeholder'
        }
      ]
    },
    {
      id: 'grading-ranking',
      title: 'Grading & Ranking',
      type: 'item',
      url: 'placeholder',
      icon: icons.IconReport
    }
  ]
};

export default Menus;
