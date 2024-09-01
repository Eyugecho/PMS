// assets

import {
  IconHome,
  IconGauge,
  IconLayoutCards,
  IconTrophy,
  IconZoomScan,
  IconCircleCheck,
  IconListCheck,
  IconHazeMoon
} from '@tabler/icons-react';

// constant
const icons = {
  IconHome,
  IconGauge,
  IconLayoutCards,
  IconTrophy,
  IconZoomScan,
  IconCircleCheck,
  IconListCheck,
  IconHazeMoon
};
import getRolesAndPermissionsFromToken from 'utils/auth/getRolesAndPermissionsFromToken';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const auth = getRolesAndPermissionsFromToken();

export const dashboard = () => {
  let childrenTemp = [];

  childrenTemp.push({
    id: 'default',
    title: 'Home',
    type: 'item',
    url: '/',
    icon: icons.IconHome,
    breadcrumbs: false
  });
  auth &&
    auth.forEach((role) => {
      if (role.permissions.find((per) => per.name == 'read:kpi')) {
        childrenTemp.push({
          id: 'kpi-management',
          title: 'KPI Managment',
          type: 'item',
          url: '/kpi/kpi-managment',
          icon: icons.IconGauge
        });
      }
    });

  auth &&
    auth.forEach((role) => {
      if (role.permissions.find((per) => per.name == 'read:targetsetting')) {
        childrenTemp.push({
          id: 'planning',
          title: 'Planning',
          type: 'item',
          url: '/planning',
          icon: icons.IconLayoutCards
        });
      }
    });

  childrenTemp.push(
    {
      id: 'mointoring',
      title: 'Monitoring',
      type: 'collapse',
      url: 'monitoring',
      icon: icons.IconZoomScan,
      children: [{ id: 'eod_activity', title: 'EOD Activity', type: 'item', url: '/Eod' }]
    },

    {
      id: 'evaluations',
      title: 'Evaluation',
      type: 'item',
      url: 'evaluations',
      icon: icons.IconListCheck
    },
    {
      id: 'approvals',
      title: 'Approval Managment',
      type: 'collapse',
      url: 'taks',
      icon: icons.IconCircleCheck,
      children: [
        {
          id: 'tasks',
          title: 'Tasks',
          type: 'item',
          url: 'tasks'
        }
      ]
    },
    {
      id: 'performance',
      title: 'Performance',
      type: 'item',
      url: 'performance',
      icon: icons.IconTrophy
    }
  );

  return {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [...childrenTemp]
  };
};
