import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project imports
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';

// assets
import { IconMenu2 } from '@tabler/icons-react';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import LogoSection from '../LogoSection';
import ToggleTheme from './Theme';
import FiscalYearMenu from './FiscalYear';

// ==============================|| MAIN NAVBAR HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle, drawerOpen }) => {
  const theme = useTheme();
  const user = useSelector((state) => state.user.user);
  const isSuperAdmin = user?.roles?.length === 1 && user.roles[0].name.toLowerCase() === 'super_admin';

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          display: 'flex'
        }}
      >
        <IconButton variant="rounded" onClick={handleLeftDrawerToggle}>
          <IconMenu2 stroke={1.5} size="1.6rem" color={theme.palette.text.primary} />
        </IconButton>

        <Box sx={{ marginLeft: 2.4 }}>{!drawerOpen && <LogoSection />}</Box>
      </Box>
      {!isSuperAdmin && <FiscalYearMenu />}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <ToggleTheme />
      <NotificationSection />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
