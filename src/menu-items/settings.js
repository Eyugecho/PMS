// assets
import {
  IconDashboard,
  IconReport,
  IconShadow,
  IconActivity,
  IconSettingsStar,
  IconFileReport,
  IconBrandCampaignmonitor,
  IconRoute,
  IconWaveSawTool,
  IconCalendarWeek,
  IconRulerMeasure,
  IconPerspective,
  IconFolderStar
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
  IconBrandCampaignmonitor,
  IconRoute,
  IconWaveSawTool,
  IconCalendarWeek,
  IconRulerMeasure,
  IconPerspective,
  IconFolderStar
};

// ==============================|| Kpi_basic_config  MENU ITEMS ||============================== //

const auth = getRolesAndPermissionsFromToken();

export const settings = () => {
  let childrenTemp = [];

  auth &&
    auth.forEach((role) => {
      if (
        role.permissions.find((per) => per.name == 'read:fiscalyear') ||
        role.permissions.find((per) => per.name == 'read:frequency') ||
        role.permissions.find((per) => per.name == 'read:evaluationtype') ||
        role.permissions.find((per) => per.name == 'read:measuringunit') ||
        role.permissions.find((per) => per.name == 'read:period') ||
        role.permissions.find((per) => per.name == 'read:perspectivetype') ||
        role.permissions.find((per) => per.name == 'read:setting')
      ) {
        childrenTemp.push({
          id: 'basic-config',
          title: 'Pre-Setups',
          type: 'item',
          url: '/basic-config/basic-config-creation',
          icon: icons.IconSettingsStar
        });
      }

      if (role.permissions.find((per) => per.name == 'read:frequency')) {
        childrenTemp.push({
          id: 'frequencies',
          title: 'Frequencies',
          type: 'item',
          url: '/frequencies',
          icon: icons.IconWaveSawTool
        });
      }

      if (role.permissions.find((per) => per.name == 'read:period')) {
        childrenTemp.push({
          id: 'periods',
          title: 'Periods',
          type: 'item',
          url: '/periods',
          icon: icons.IconCalendarWeek
        });
      }

      if (role.permissions.find((per) => per.name == 'read:measuringunit')) {
        childrenTemp.push({
          id: 'measuring-units',
          title: 'Measuring Units',
          type: 'item',
          url: '/measuring-units',
          icon: icons.IconRulerMeasure
        });
      }

      if (role.permissions.find((per) => per.name == 'read:perspectivetype')) {
        childrenTemp.push({
          id: 'perpectives',
          title: 'Perspectives',
          type: 'item',
          url: '/perspectives',
          icon: icons.IconPerspective
        });
      }

      if (role.permissions.find((per) => per.name == 'read:setting')) {
        childrenTemp.push({
          id: 'performance-rating',
          title: 'Performance Rating',
          type: 'item',
          url: '/performance-rating',
          icon: icons.IconFolderStar
        });
      }
    });

  auth &&
    auth.forEach((role) => {
      if (role.permissions.find((per) => per.name == 'read:setting')) {
        childrenTemp.push({
          id: 'workflows',
          title: 'Approval Workflows',
          type: 'item',
          url: '/workflows',
          icon: icons.IconRoute
        });
      }
    });
  return {
    id: 'settings',
    title: 'Settings',
    type: 'group',
    icon: icons.IconSettingsStar,
    children: [...childrenTemp]
  };
};
