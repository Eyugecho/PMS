// assets
import {
  IconDashboard,
  IconReport,
  IconShadow,
  IconActivity,
  IconSettingsStar,
  IconFileReport,
  IconBrandCampaignmonitor
} from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconReport, IconShadow, IconActivity, IconSettingsStar, IconFileReport, IconBrandCampaignmonitor };

// ==============================|| Kpi_basic_config  MENU ITEMS ||============================== //

const settings = {
  id: 'settings',
  title: 'Settings',
  type: 'group',
  children: [
    {
      id: 'basic-config',
      title: 'Pre-Setups',
      type: 'item',
      url: '/basic-config/basic-config-creation',
      icon: icons.IconSettingsStar
    }
  ]
};

export default settings;
