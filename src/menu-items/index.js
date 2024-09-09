// import dashboard from './dashboard';
import { getOrgStructure } from './org-structure';
import { settings } from './settings';
import { Accounts } from './account';
import { dashboard } from './dashboard';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard(), getOrgStructure(), Accounts(), settings()]
};

export default menuItems;
