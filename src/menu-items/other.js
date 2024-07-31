// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    // {
    //   id: 'sample-page',
    //   title: 'Feed Back',
    //   type: 'item',
    //   // url: '/sample-page',
    //   icon: icons.IconBrandChrome,
    //   breadcrumbs: false
    // },
    {
      id: 'documentation',
      title: 'Help',
      type: 'item',
      // url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
