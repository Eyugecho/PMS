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
import LogoSection from '../LogoSection';
import ToggleTheme from './Theme';
import FiscalYearMenu from './FiscalYear';

// ==============================|| MAIN NAVBAR HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle, drawerOpen }) => {
  const theme = useTheme();

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
      <FiscalYearMenu />
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
