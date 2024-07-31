import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Protected from 'Protected';
import { element } from 'prop-types';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const Units = Loadable(lazy(() => import('views/departments')));
const ViewUnit = Loadable(lazy(() => import('views/departments/view')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UserCreation = Loadable(lazy(() => import('views/newuser-creation/view/user-view')));
const PrevilageCreation = Loadable(lazy(() => import('views/newprevilage-creation/view/previlage-view')));
const RoleCreation = Loadable(lazy(() => import('views/newrole-creation/view/role-view')));
const ResetPage = Loadable(lazy(() => import('views/password-reset/view/reset-view')));
const BasicConfigPage = Loadable(lazy(() => import('views/basic-configurations/view/basic-config')));
const KpiManagePage = Loadable(lazy(() => import('views/kpi-managment/view/kpiMange-view')));

// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <Protected>
          <DashboardDefault />
        </Protected>
      )
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: (
            <Protected>
              <DashboardDefault />
            </Protected>
          )
        }
      ]
    },
    {
      path: 'units',
      element: (
        <Protected>
          <Units />
        </Protected>
      )
    },

    {
      path: 'units/view',
      element: (
        <Protected>
          <ViewUnit />
        </Protected>
      )
    },

    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: (
            <Protected>
              <UtilsColor />
            </Protected>
          )
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: (
            <Protected>
              <UtilsShadow />
            </Protected>
          )
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'user-creation',
          element: (
            <Protected>
              <UserCreation />
            </Protected>
          )
        }
      ]
    },
    {
      path: 'previlage',
      children: [
        {
          path: 'previlage-creation',
          element: (
            <Protected>
              <PrevilageCreation />
            </Protected>
          )
        }
      ]
    },
    {
      path: 'role',
      children: [
        {
          path: 'role-creation',
          element: (
            <Protected>
              <RoleCreation />
            </Protected>
          )
        }
      ]
    },
    {
      path: 'reset',
      children: [
        {
          path: 'reset-password',
          element: (
            <Protected>
              <ResetPage />
            </Protected>
          )
        }
      ]
    },

    {
      path: 'basic-config',
      children: [
        {
          path: 'basic-config-creation',
          element: (
            <Protected>
              <BasicConfigPage />
            </Protected>
          )
        }
      ]
    },
    {
      path: 'kpi',
      children: [
        {
          path: 'kpi-managment',
          element: (
            <Protected>
              <KpiManagePage />
            </Protected>
          )
        }
      ]
    },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },
    {
      path: 'sample-page',
      element: (
        <Protected>
          <SamplePage />
        </Protected>
      )
    }
  ]
};

export default MainRoutes;
