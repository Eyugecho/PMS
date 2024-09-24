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
  IconChartInfographic
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
  IconLayoutCards

};
import getRolesAndPermissionsFromToken from 'utils/auth/getRolesAndPermissionsFromToken';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const auth = getRolesAndPermissionsFromToken();

export const dashboard = () => {
  let childrenTemp = [];


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
      if (role.permissions.find((per) => per.name == 'read:employeetask')) {
        childrenTemp.push({
          id: 'todos',
          title: 'To do ',
          type: 'item',
          url: '/todo',
          icon: icons.IconList
        });
      }
    });
  auth &&
    auth.forEach((role) => {
      if (role.permissions.find((per) => per.name == 'read:endofdayactivity')) {
        childrenTemp.push({
          id: 'eod_activity',
          title: 'EOD ',
          type: 'item',
          url: '/Eod',
          icon: icons.IconHazeMoon
        });
      }
    });
  auth &&
    auth.forEach((role) => {
      if (role.permissions.find((per) => per.name == 'read:kpitracker')) {
        childrenTemp.push({
          id: 'planning',
          title: 'Planning',
          type: 'item',
          url: '/planning',
          icon: icons.IconLayoutCards
        });
      }
    });

  auth &&
    auth.forEach((role) => {
      if (role.permissions.find((per) => per.name == 'approval:manage')) {


        childrenTemp.push({
          id: 'report',
          title: 'Reports',
          type: 'item',
          url: 'report',
          icon: icons.IconChartInfographic
        });

        childrenTemp.push({
          id: 'approvals',
          title: 'Approval Managment',
          type: 'item',
          url: 'tasks',
          icon: icons.IconCircleCheck
        });
      }
    });
  auth.forEach((role) => {
    if (role.permissions.find((per) => per.name == 'read:evaluation')) {
      childrenTemp.push({
        id: 'evaluations',
        title: 'Evaluation',
        type: 'item',
        url: 'evaluations',
        icon: icons.IconListCheck
      });
    }
  });

  auth.forEach((role) => {
    if (role.permissions.find((per) => per.name == 'read:performance')) {
      childrenTemp.push({
        id: 'performance',
        title: 'Performance',
        type: 'item',
        url: 'performance',
        icon: icons.IconTrophy
      });
    }
  });


  return {
    id: 'dashboard',
    title: 'Planning Management',
    icon: icons.IconLayoutCards,
    type: 'group',
    children: [...childrenTemp]

  };
};