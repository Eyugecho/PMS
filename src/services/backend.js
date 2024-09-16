const Backend = {
  api: import.meta.env.VITE_PMS_URL,
  auth: import.meta.env.VITE_AUTH_URL,
  login: 'login-with-email',
  logout: 'logout',
  users: 'users',
  refreshToken: 'refresh',
  resetPassword: 'reset-password',
  setPassword: 'create-password',
  verifyOtp: 'verify-otp',
  myProfile: 'my-profile',
  changePassword: 'change-password',
  updateProfileImage: 'update-profile-image',
  removeProfileImage: 'remove-profile-image',
  roles: 'roles',
  units: 'units',
  unitByTypes: 'unit-by-type/',
  types: 'unit-types',
  employees: 'employees',
  employeeExcel: 'import-employee-excel',
  kpi: 'kpis',
  getStats: 'get-counts',
  preSetups: 'kpi-pre-setups',
  fiscalYear: 'get-fiscal-year',
  periods: 'periods',
  frequencies: 'frequencies',
  planningPeriods: 'get-planing-period',
  planningFrequiencies: 'get-planing-frequencies',
  orgPlan: 'main-kpi-tracking',
  showPlan: 'show-plan',
  deletePlan: 'delete-plan',
  getMyPlans: 'get-my-kpi-trackings',
  planInitiative: 'update-initiative/',
  distributeTarget: 'distribute-kpi-tracking',
  childUnits: 'get-my-child-units',
  childTarget: 'get-my-child-targets/',
  showTarget: 'show-target/',
  getDepartments: 'get-departments',
  getActiveDepartments: 'get-active-departments',
  getEmployees: 'get-employees',
  getActiveEmployees: 'get-active-employees',
  getManagers: 'get-managers',
  getUnitTarget: 'get-tasks-by-unit/',
  getEmployeeTarget: 'get-tasks-by-employee/',
  employeePerformance: 'employee-performance/',
  employeeTasks: 'employee-tasks',
  employeeTaskStatus: 'update-employee-task-status/',
  employeesTaskGraph: 'get-employee-task-graph',
  myTaskGraph: 'my-task-graph',
  employeeEligiblity: 'employee-eligible/',
  getEmployeeTask: 'get-employee-tasks/',
  evaluate: 'evaluate',
  unitPerformance: 'unit-performance/',
  myPerformance: 'my-performance',
  myUnitPerformance: 'my-unit-performance',
  myKPIS: 'my-kpis',
  workflows: 'workflows',
  createWorkflow: 'create-workflow',
  updateWorkflow: 'update-workflow',
  deleteWorkflow: 'delete-workflow',

  /**Eyuel Endpoints */
  permissi: 'permissions',
  role: 'roles',
  fiscal_years: 'fiscal-years',
  planning_periods: 'create-planning-period',
  frequency_period_values: 'create-frequency-definition-period',
  evaluation_periods: 'create-evaluation-period',
  eodfetch: 'end-of-day-activities',
  getCount: 'get-counts',
  getEmployeesInDep: 'my-child-units-employee-count',
  getRankings: 'rank-performance',
  unitKpiPerformance: 'show-performance-chart',
  unitEmployeeEndpoint: 'get-unit-employees-with-performance/'
};
export default Backend;
