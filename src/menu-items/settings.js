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
import getRolesAndPermissionsFromToken from 'utils/auth/getRolesAndPermissionsFromToken';

// constant
const icons = {
  IconDashboard,
  IconReport,
  IconShadow,
  IconActivity,
  IconSettingsStar,
  IconFileReport,
  IconBrandCampaignmonitor
};

// ==============================|| Kpi_basic_config  MENU ITEMS ||============================== //

const auth = getRolesAndPermissionsFromToken()

export const settings = () => {

  let childrenTemp = []

  auth.forEach(role => {



    if (role.permissions.find(per => per.name == "read:fiscalyear") || role.permissions.find(per => per.name == "read:frequency") || role.permissions.find(per => per.name == "read:evaluationtype") || role.permissions.find(per => per.name == "read:measuringunit") || role.permissions.find(per => per.name == "read:period") || role.permissions.find(per => per.name == "read:perspectivetype")) {
      childrenTemp.push({
        id: 'basic-config',
        title: 'Pre-Setups',
        type: 'item',
        url: '/basic-config/basic-config-creation',
        icon: icons.IconSettingsStar
      })
    }
  })
  return {
    id: 'settings',
    title: 'Settings',
    type: 'group',
    children: [



      ...childrenTemp


    ]
  }
}

