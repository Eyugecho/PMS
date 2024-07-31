// assets
import { IconDashboard,IconReport,IconShadow ,IconUser} from '@tabler/icons-react';

// constant
const icons = { IconDashboard ,IconReport,IconShadow,IconUser};

// ==============================|| other_section  MENU ITEMS ||============================== //

const other_section = {
  id: 'other_sec',
  title: 'Users',
  type: 'group',
  children: [

    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      // url: '/utils/user-creation',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
        id: 'change-password',
        title: 'Change Password',
        type: 'item',
        // url: '/utils/user-creation',
        icon: icons.IconReport,
        breadcrumbs: false
      },
  ]
};

export default other_section;
