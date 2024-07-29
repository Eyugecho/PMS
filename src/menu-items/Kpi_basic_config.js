// assets
import { IconDashboard,IconReport,IconShadow } from '@tabler/icons-react';

// constant
const icons = { IconDashboard ,IconReport,IconShadow};

// ==============================|| Kpi_basic_config  MENU ITEMS ||============================== //

const Kpi_basic_config = {
  id: 'Kpi_basic_config',
  title: '',
  type: 'group',
  children: [
    {
        id: 'basic-config',
        title: 'Pre-Setups',
        type: 'item',
        url: '/basic-config/basic-config-creation',
        icon: icons.IconReport,
        

        // target: true
      },
      {
        id: 'kpi',
        title: 'Kpi Managment',
        type: 'item',
        url: '/kpi/kpi-managment',
        icon: icons.IconReport,
        

        // target: true
      },
  ]
};

export default Kpi_basic_config;
