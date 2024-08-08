import dashboard from './dashboard';
import pages from './pages';
import other from './other';
import report from './reports';
import Menus from './menus';
import department from './departments';
import settings from './settings';

// ==============================|| MENU ITEMS ||============================== //

let role = 'Employee';
const menuItems = {
  items: [dashboard, Menus, department, report, pages, settings, other]
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
