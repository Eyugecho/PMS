// assets
import { IconDashboard,IconReport,IconShadow,IconActivity,IconSettingsStar,IconFileReport,IconBrandCampaignmonitor,IconPacman } from '@tabler/icons-react';

// constant
const icons = { IconDashboard ,IconReport,IconShadow,IconActivity,IconSettingsStar,IconFileReport,IconBrandCampaignmonitor};




// ==============================|| Kpi_basic_config  MENU ITEMS ||============================== //

const Kpi_basic_config = {
  id: 'Kpi_basic_config',
  title: 'Planning',
  type: 'group',
    // requiredRoles: ['Admin'],
  children: [
    // {
    //     id: 'basic-config',
    //     title: 'Pre-Setups',
    //     type: 'item',
    //     url: '/basic-config/basic-config-creation',
    //     icon: icons.IconSettingsStar,
        

    //     // target: true
    //   },
  
      {
        id: 'kpi',
        title: 'Kpi Register',
        type: 'item',
        url: '/kpi/kpi-managment',
        icon: icons.IconReport,
        

        // target: true
      },
  

    // {
    //     id: 'target-settings',
    //     title: 'Target Settings',
    //     type: 'item',
    //     // url: '/basic-config/basic-config-creation',
    //     icon: icons.IconReport,
    
    //     // target: true
    //   },
      {
        id: 'mointoring',
        title: 'Mointoring',
        type: 'collapse',
        icon: icons.IconBrandCampaignmonitor,
        children: [
            {
                id: 'daily-activity',
                title: 'Daily Activity Settings',
                type: 'item',
                // url: '/kpi/kpi-managment',
                // icon: icons.IconReport,
                
        
                // target: true
              },
              {
                id: 'moitoring-evaluation',
                title: 'Mointoring & Evaluation',
                type: 'item',
                // url: '/kpi/kpi-managment',
                // icon: icons.IconReport,
                
        
                // target: true
              },

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
                icon: icons.IconReport,
                
        
                // target: true
              },
              {
                id: 'feedbacks',
                title: 'Feedbacks',
                type: 'item',
                // url: '/kpi/kpi-managment',
                icon: icons.IconReport,
                
        
                // target: true
              },

        ]
    },
    {
        id: 'grading-ranking',
        title: 'Grading & Ranking',
        type: 'item',
        // url: '/basic-config/basic-config-creation',
        icon: icons.IconReport,
    
        // target: true
      },
      
  ]
};

export default Kpi_basic_config;
