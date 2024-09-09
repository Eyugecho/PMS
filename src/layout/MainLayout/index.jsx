import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { styled, useTheme } from '@mui/material';
import { SET_MENU } from 'store/actions/actions';
import { drawerWidth } from 'store/constant';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import { useEffect } from 'react';
import Backend from 'services/backend';
import { toast } from 'react-toastify';
import { SET_FISCAL_YEARS, SET_SELECTED_FISCAL_YEAR } from 'store/actions';
import GetToken from 'utils/auth-token';
import GetFiscalYear from 'utils/components/GetFiscalYear';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth})`
    },
    [theme.breakpoints.down('md')]: {
      width: `100%`
    },
    [theme.breakpoints.down('sm')]: {
      width: `100%`
    }
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${drawerWidth}px)`
  })
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const selectedFiscal = useSelector((state) => state.customization.selectedFiscalYear);
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  // useEffect(() => {
  //   const handleGettingFiscalYear = async () => {
  //     try {
  //       const Api = Backend.api + Backend.fiscalYear;
  //       const token = await GetToken();
  //       const response = await fetch(Api, {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json'
  //         }
  //       });
  //       const data = await response.json();
  //       if (data.success) {
  //         dispatch({ type: SET_FISCAL_YEARS, fiscalYears: data.data });
  //         if (selectedFiscal) {
  //           const selected = data?.data?.find((year, index) => year.id === selectedFiscal?.id);
  //           data.data[0] && dispatch({ type: SET_SELECTED_FISCAL_YEAR, selectedFiscalYear: selected });
  //         } else {
  //           if (data.data[0]) {
  //             dispatch({ type: SET_SELECTED_FISCAL_YEAR, selectedFiscalYear: data.data[0] });
  //           }
  //         }
  //       } else {
  //         toast.error('Failed to fetch fiscal year data');
  //       }
  //     } catch (error) {
  //       toast.error('Error fetching fiscal year:', error);
  //     }
  //   };
  //   handleGettingFiscalYear();
  // }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
      <Main theme={theme} open={leftDrawerOpened} sx={{ backgroundColor: theme.palette.background.default }}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 2,
            paddingX: 4,
            paddingY: 1.6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: {
              xl: leftDrawerOpened ? `calc(100% - ${drawerWidth}px)` : '100%',
              lg: leftDrawerOpened ? `calc(100% - ${drawerWidth}px)` : '100%',
              md: leftDrawerOpened ? `calc(100% - ${drawerWidth}px)` : '100%',
              sm: '100%',
              xs: '100%'
            },
            backgroundColor: theme.palette.primary.light,
            borderBottom: 0.6,
            borderColor: theme.palette.divider
          }}
        >
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} drawerOpen={leftDrawerOpened} />
          <GetFiscalYear />
        </Box>

        <Outlet />
      </Main>
      <Customization />
    </Box>
  );
};

export default MainLayout;
