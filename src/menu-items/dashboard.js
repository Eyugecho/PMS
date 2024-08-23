// assets

import {
  IconHome,
  IconGauge,
  IconLayoutCards,
  IconTrophy,
  IconStethoscope,
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
  IconStethoscope,
  IconCircleCheck,
  IconListCheck,
  IconHazeMoon
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',

  children: [
    {
      id: 'default',
      title: 'Home',
      type: 'item',
      url: '/planning',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: 'kpi-management',
      title: 'KPI Managment',
      type: 'item',
      url: '/kpi/kpi-managment',
      icon: icons.IconGauge
    },
    {
      id: 'planning',
      title: 'Planning',
      type: 'item',
      url: '/planning',
      icon: icons.IconLayoutCards
    },

    {
      id: 'mointoring',
      title: 'Monitoring',
      type: 'collapse',
      url: 'monitoring',
      icon: icons.IconStethoscope,
      children: [
        {
          id: 'daily-activity',
          title: 'Daily Activity',
          type: 'item',
          url: '/monitoring/daily'
        },
        {
          id: 'eod_activity',
          title: 'EOD Activity',
          type: 'item',
          url: '/Eod'
        }
      ]
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
      url: 'approvals',
      icon: icons.IconCircleCheck,
      children: [
        {
          id: 'approvals',
          title: 'Approvals',
          type: 'item',
          url: 'approvals'
        },
        {
          id: 'feedbacks',
          title: 'Feedbacks',
          type: 'item',
          url: 'placeholder'
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
  ]
};

export default dashboard;
