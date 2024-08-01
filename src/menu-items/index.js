import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import report from './reports';
import other_section from './other_sections';
import Kpi_basic_config from './Kpi_basic_config';
import department from './departments';
import settings from './settings';


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard,Kpi_basic_config,report,department,pages,settings,other]
};

export default menuItems;
