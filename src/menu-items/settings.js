// assets
import { IconDashboard,IconReport,IconShadow,IconActivity,IconSettingsStar,IconFileReport,IconBrandCampaignmonitor,IconPacman } from '@tabler/icons-react';

// constant
const icons = { IconDashboard ,IconReport,IconShadow,IconActivity,IconSettingsStar,IconFileReport,IconBrandCampaignmonitor};




// ==============================|| Kpi_basic_config  MENU ITEMS ||============================== //

const settings = {
  id: 'settings',
  title: 'Settings',
  type: 'group',
    // requiredRoles: ['Admin'],
  children: [
    {
        id: 'basic-config',
        title: 'Pre-Setups',
        type: 'item',
        url: '/basic-config/basic-config-creation',
        icon: icons.IconSettingsStar,
        

        // target: true
      },
    ]
};

export default settings;