import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';

import Divider from '@mui/material/Divider';

// assets
import { IconMenu2 } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
          
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 , ml:2}}>
          <LogoSection />
        </Box>
        {/* <Divider orientation="vertical" flexItem  sx={{ width: { md: 100, lg: 20 } }}/> */}
        <ButtonBase sx={{ borderRadius: '8px', overflow: 'hidden' , ml:5}}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light_icon,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark_icon_hover,
                color: theme.palette.secondary.dark
              }
              
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <NotificationSection />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
