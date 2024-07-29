import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import report from './reports';
import other_section from './other_sections';
import Kpi_basic_config from './Kpi_basic_config';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, pages,Kpi_basic_config, utilities,report,other_section, other]
};

export default menuItems;
