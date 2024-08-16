import dashboard from './dashboard';
import ReportsAndAnalysis from './reports-analysis';
import OrgStructure from './org-structure';
import settings from './settings';
import Accounts from './account';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, OrgStructure, ReportsAndAnalysis, Accounts, settings]
};
// const adminMenu = {
//   items: [dashboard, Menus, report]
// };

// const managerMenu = {
//   items: [dashboard, Menus]
// };

// const employeeMenu = {
//   items: [dashboard, Menus]
// };

export default menuItems;
