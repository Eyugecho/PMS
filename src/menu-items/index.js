// import dashboard from './dashboard';
import ReportsAndAnalysis from './reports-analysis';
import {
    getOrgStructure
} from './org-structure';
import {
    settings
} from './settings';
import {
    Accounts
} from './account';
import {
    dashboard
} from './dashboard';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard(), getOrgStructure(), ReportsAndAnalysis, Accounts(), settings()]
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