import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Protected from 'Protected';
import ViewTask from 'views/tasks/view';
import NotFound from 'views/not-found';
import Frequencies from 'views/settings/frequencies';
import Periods from 'views/settings/periods';
import MeasuringUnits from 'views/settings/measuring-units';
import Perspectives from 'views/settings/perspectives';
import PerformanceRating from 'views/settings/performance-ratings';

// dashboard routing
const Home = Loadable(lazy(() => import('views/dashboard')));
const Units = Loadable(lazy(() => import('views/units')));
const ViewUnit = Loadable(lazy(() => import('views/units/view')));
const Planning = Loadable(lazy(() => import('views/planning')));
const Employees = Loadable(lazy(() => import('views/employees')));
const ViewEmployee = Loadable(lazy(() => import('views/employees/view')));

const Ranking = Loadable(lazy(() => import('views/ranking')));
const Perfomance = Loadable(lazy(() => import('views/performance')));
const Feedbacks = Loadable(lazy(() => import('views/approvals/feedback')));
const Tasks = Loadable(lazy(() => import('views/tasks')));
const Approvals = Loadable(lazy(() => import('views/approvals')));
const DailyActivity = Loadable(lazy(() => import('views/monitoring/daily')));
const Evaluations = Loadable(lazy(() => import('views/evaluation')));
const Monitoring = Loadable(lazy(() => import('views/monitoring')));
const ViewPlan = Loadable(lazy(() => import('views/planning/View')));
const Account = Loadable(lazy(() => import('views/account')));
const KPIManagement = Loadable(lazy(() => import('views/kpi')));
const Users = Loadable(lazy(() => import('views/users')));
const Workflows = Loadable(lazy(() => import('views/workflows')));
const Report2 = Loadable(lazy(() => import('views/Report/admin_side/index')));
const Viewoverallcompany = Loadable(lazy(() => import('views/Report/admin_side/UnitDetailView')));
const ViewKpiDetail = Loadable(lazy(() => import('views/Report/admin_side/KpiDetailView')));
const Job = Loadable(lazy(() => import('views/settings/JobPosition')));
const Todo = Loadable(lazy(() => import('views/todo')));

// utilities routing
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const BasicConfigPage = Loadable(lazy(() => import('views/settings/view/basic-config')));
const EodActivityPage = Loadable(lazy(() => import('views/Eod/EodActivity')));
const RolePermission = Loadable(lazy(() => import('views/roles_permission/Page')));
const Unauthorized = Loadable(lazy(() => import('utils/unautorized')));

// sample page routingkpiMange-view
const Testpage = Loadable(lazy(() => import('views/sample-page/test')));
const Fortest = Loadable(lazy(() => import('views/dashboard/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <Protected>
          <Home />
        </Protected>
      )
    },
    {
      path: 'home',
      element: (
        <Protected>
          <Home />
        </Protected>
      )
    },

    {
      path: 'account',
      element: (
        <Protected>
          <Account />
        </Protected>
      )
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
      path: 'evaluations',
      element: (
        <Protected>
          <Evaluations />
        </Protected>
      )
    },

    {
      path: 'tasks',
      element: (
        <Protected>
          <Tasks />
        </Protected>
      )
    },

    {
      path: 'task/detail',
      element: (
        <Protected>
          <ViewTask />
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
      path: 'workflows',
      element: (
        <Protected>
          <Workflows />
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
      path: 'performance',
      element: (
        <Protected>
          <Perfomance />
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
      path: 'ranking',
      element: (
        <Protected>
          <Ranking />
        </Protected>
      )
    },
    {
      path: 'todo',
      element: (
        <Protected>
          <Todo />
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
      path: 'frequencies',
      element: (
        <Protected>
          <Frequencies />
        </Protected>
      )
    },
    {
      path: 'periods',
      element: (
        <Protected>
          <Periods />
        </Protected>
      )
    },
    {
      path: 'measuring-units',
      element: (
        <Protected>
          <MeasuringUnits />
        </Protected>
      )
    },
    {
      path: 'perspectives',
      element: (
        <Protected>
          <Perspectives />
        </Protected>
      )
    },

    {
      path: 'performance-rating',
      element: (
        <Protected>
          <PerformanceRating />
        </Protected>
      )
    },
    {
      path: 'kpi',
      children: [
        {
          path: 'kpi-managment',
          element: (
            <Protected>
              <KPIManagement />
            </Protected>
          )
        }
      ]
    },

    {
      path: 'Eod',
      element: (
        <Protected>
          <EodActivityPage />
        </Protected>
      )
    },
    {
      path: 'users',
      element: (
        <Protected>
          <Users />
        </Protected>
      )
    },

    {
      path: 'role-permission',
      element: (
        <Protected>
          <RolePermission />
        </Protected>
      )
    },

    {
      path: '/report/overall_company',
      element: (
        <Protected>
          <Viewoverallcompany />
        </Protected>
      )
    },

    {
      path: '/report/KpiDetailView',
      element: (
        <Protected>
          <ViewKpiDetail />
        </Protected>
      )
    },

    {
      path: 'unauthorized',
      element: <Unauthorized />
    },
    {
      path: 'test',
      element: (
        <Protected>
          <Testpage />
        </Protected>
      )
    },
    {
      path: 'fortest',
      element: (
        <Protected>
          <Fortest />
        </Protected>
      )
    },
    {
      path: 'report',
      element: (
        <Protected>
          <Report2 />
        </Protected>
      )
    },
    {
      path: 'job',
      element: (
        <Protected>
          <Job />
        </Protected>
      )
    },
    {
      path: '/*',
      element: <NotFound />
    }
  ]
};

export default MainRoutes;
