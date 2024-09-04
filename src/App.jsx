import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { SET_FISCAL_YEARS, SET_SELECTED_FISCAL_YEAR } from 'store/actions';
import { useDispatch } from 'react-redux';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContext } from 'context/AuthContext';
import { useEffect, useMemo, useState } from 'react';
import { KPIProvider } from 'context/KPIProvider';
import { toast, ToastContainer } from 'react-toastify';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';

// ==============================|| APP ||============================== //

const queryClient = new QueryClient();

const App = () => {
  const customization = useSelector((state) => state.customization);
  const selectedFiscal = useSelector((state) => state.customization.selectedFiscalYear);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const dispatch = useDispatch();

  const authContext = useMemo(
    () => ({
      signin: () => {
        setIsSignedIn(true);
      },
      signOut: () => {
        setIsSignedIn(false);
      },
      isSignedIn
    }),
    [isSignedIn]
  );

  useEffect(() => {
    const handleGettingFiscalYear = async () => {
      try {
        const Api = Backend.api + Backend.fiscalYear;
        const token = await GetToken();

        const response = await fetch(Api, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (data.success) {
          dispatch({ type: SET_FISCAL_YEARS, fiscalYears: data.data });
          if (selectedFiscal) {
            const selected = data?.data?.find((year, index) => year.id === selectedFiscal?.id);
            console.log('we have selected year' + selected);
            

            data.data[0] && dispatch({ type: SET_SELECTED_FISCAL_YEAR, selectedFiscalYear: selected });
          }
        } else {
          toast.error('Failed to fetch fiscal year data');
        }
      } catch (error) {
        toast.error('Error fetching fiscal year:', error);
      }
    };

    handleGettingFiscalYear();
  }, []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <AuthContext.Provider value={authContext}>
          <KPIProvider>
            <QueryClientProvider client={queryClient}>
              <CssBaseline />
              <NavigationScroll>
                <RouterProvider router={router} />
                <ToastContainer />
              </NavigationScroll>
            </QueryClientProvider>
          </KPIProvider>
        </AuthContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
