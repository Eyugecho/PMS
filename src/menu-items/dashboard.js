import {
  IconHome,
  IconGauge,
  IconLayoutCards,
  IconTrophy,
  IconZoomScan,
  IconCircleCheck,
  IconListCheck,
  IconHazeMoon,
  IconList,
  IconChartInfographic,
  IconKey
} from '@tabler/icons-react';

const icons = {
  IconHome,
  IconGauge,
  IconLayoutCards,
  IconTrophy,
  IconZoomScan,
  IconCircleCheck,
  IconListCheck,
  IconHazeMoon,
  IconList,
  IconChartInfographic,
  IconLayoutCards,
  IconKey
};
import getRolesAndPermissionsFromToken from 'utils/auth/getRolesAndPermissionsFromToken';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const auth = getRolesAndPermissionsFromToken();
export const dashboard = () => {
  const childrenTemp = [];
  const addedPermissions = new Set();

  const orderedPermissions = [
    'read:kpi',
    'read:employeetask',
    'read:endofdayactivity',
    'read:kpitracker',
    'approval:manage',
    'read:evaluation',
    'read:performance'
  ];

  const permissionMap = {
    'read:kpi': {
      id: 'kpi-management',
      title: 'KPI Management',
      url: '/kpi/kpi-managment',
      icon: icons.IconKey
    },
    'read:employeetask': {
      id: 'todos',
      title: 'To Do',
      url: '/todo',
      icon: icons.IconList
    },
    'read:endofdayactivity': {
      id: 'eod_activity',
      title: 'EOD',
      url: '/Eod',
      icon: icons.IconHazeMoon
    },

    'read:kpitracker': {
      id: 'planning',
      title: 'Planning',
      url: '/planning',
      icon: icons.IconLayoutCards
    },

    'approval:manage': {
      id: 'approvals',
      title: 'Approval Management',
      url: '/approvals',
      icon: icons.IconCircleCheck
    },

    'read:evaluation': {
      id: 'evaluations',
      title: 'Evaluation',
      url: '/evaluations',
      icon: icons.IconListCheck
    },
    'read:performance': {
      id: 'performance',
      title: 'Performance',
      url: '/performance',
      icon: icons.IconTrophy
    },
    'read:report': {
      id: 'report',
      title: 'Reports',
      url: '/report',
      icon: icons.IconChartInfographic
    }
  };

  if (auth) {
    orderedPermissions.forEach((permissionName) => {
      auth.forEach((role) => {
        const setting = permissionMap[permissionName] || permissionMap[`${permissionName}-approvals`];

        if (setting && !addedPermissions.has(setting.id)) {
          const hasPermission = role.permissions.find((per) => per.name === permissionName);

          if (hasPermission) {
            childrenTemp.push({
              ...setting,
              type: 'item'
            });
            addedPermissions.add(setting.id);
          }
        }
      });
    });
  }

  return {
    id: 'dashboard',
    title: 'Performance Management',
    icon: icons.IconGauge,
    type: 'group',
    children: childrenTemp
  };
};
