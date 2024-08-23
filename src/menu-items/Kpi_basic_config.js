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

// ==============================|| Kpi_basic_config  MENU ITEMS ||============================== //



const Kpi_basic_config = {
  id: 'Kpi_basic_config',
  title: 'Planning',
  type: 'group',

  children: [

    {
      id: 'kpi',
      title: 'Kpi Managment',
      type: 'item',
      url: '/kpi/kpi-managment',
      icon: icons.IconFileReport,

    },


    {
      id: 'planning',
      title: 'Planning',
      type: 'item',
      icon: icons.IconAdjustmentsHorizontal,
      url: '/planning'
    },

    {
      id: 'mointoring',
      title: 'Monitoring',
      type: 'collapse',
      icon: icons.IconBrandCampaignmonitor,
      children: [{
          id: 'daily-activity',
          title: 'Daily Activity Settings',
          type: 'item'

        },
        {
          id: 'moitoring-evaluation',
          title: 'Mointoring & Evaluation',
          type: 'item'

        }
      ]
    },

    {
      id: 'approval-settings',
      title: 'Approval Managment',
      type: 'collapse',
      icon: icons.IconDashboard,
      children: [{
          id: 'approvals',
          title: 'Approvals',
          type: 'item',

          icon: icons.IconReport


        },
        {
          id: 'feedbacks',
          title: 'Feedbacks',
          type: 'item',

          icon: icons.IconReport


        }
      ]
    },
    {
      id: 'grading-ranking',
      title: 'Grading & Ranking',
      type: 'item',

      icon: icons.IconReport


    }
  ]
};

export default Kpi_basic_config;