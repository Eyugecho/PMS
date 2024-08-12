import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Protected from 'Protected';
import { element } from 'prop-types';
import ViewPlan from 'views/planning/View';
import { Monitoring } from 'views/monitoring';
import { Evaluation } from 'views/evaluation';
import { DailyActivity } from 'views/monitoring/daily';
import { Approvals } from 'views/approvals';
import { Feedbacks } from 'views/approvals/feedback';
import { Ranking } from 'views/ranking';
import { PagePlaceholder } from 'views/sample-page/Placeholder';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const Units = Loadable(lazy(() => import('views/departments')));
const ViewUnit = Loadable(lazy(() => import('views/departments/view')));
const Planning = Loadable(lazy(() => import('views/planning')));
const CreatePlan = Loadable(lazy(() => import('views/planning/create')));
const Employees = Loadable(lazy(() => import('views/employees')));
const ViewEmployee = Loadable(lazy(() => import('views/employees/view')));

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
const KpiTrackingPage = Loadable(lazy(() => import('views/kpi-tracking/view/kpiTrack-view')));
const EodActivityPage = Loadable(lazy(() => import('views/Eod/view/Eod-view')));
const RolePermission = Loadable(lazy(() => import('views/roles_permission/Page')));

// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Testpage = Loadable(lazy(() => import('views/sample-page/test')));

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
      path: 'employees',
      element: (
        <Protected>
          <Employees />
        </Protected>
      )
    },

    {
      path: 'employees/view',
      element: (
        <Protected>
          <ViewEmployee />
        </Protected>
      )
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
      path: 'planning',
      element: (
        <Protected>
          <Planning />
        </Protected>
      )
    },

    {
      path: 'planning/create',
      element: (
        <Protected>
          <CreatePlan />
        </Protected>
      )
    },

    {
      path: 'planning/view',
      element: (
        <Protected>
          <ViewPlan />
        </Protected>
      )
    },

    {
      path: 'monitoring',
      element: (
        <Protected>
          <Monitoring />
        </Protected>
      )
    },

    {
      path: 'monitoring/daily',
      element: (
        <Protected>
          <DailyActivity />
        </Protected>
      )
    },

    {
      path: 'evaluation',
      element: (
        <Protected>
          <Evaluation />
        </Protected>
      )
    },

    {
      path: 'approvals',
      element: (
        <Protected>
          <Approvals />
        </Protected>
      )
    },

    {
      path: 'feedbacks',
      element: (
        <Protected>
          <Feedbacks />
        </Protected>
      )
    },

    {
      path: 'ranking',
      element: (
        <Protected>
          <Ranking />
        </Protected>
      )
    },

    {
      path: 'placeholder',
      element: (
        <Protected>
          <PagePlaceholder />
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
    {
      path: 'kpi-tracking',
      children: [
        {
          path: 'kpi-track',
          element: (
            <Protected>
              <KpiTrackingPage />
            </Protected>
          )
        }
      ]
    },
    {
      path: 'Eod',
      children: [
        {
          path: 'Eod-act',
          element: (
            <Protected>
              <EodActivityPage />
            </Protected>
          )
        }
      ]
    },
    {
      path: 'rolePermission',
      element: (
        <Protected>
          <RolePermission />
        </Protected>
      )
    },
    {
      path: 'test',
      element: (
        <Protected>
          <Testpage/>
        </Protected>
      )
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
