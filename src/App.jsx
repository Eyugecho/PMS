import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContext } from 'context/AuthContext';
import { useMemo, useState } from 'react';
import { KPIProvider } from 'context/KPIProvider';
import { ToastContainer } from 'react-toastify';
import MainRoutes from 'routes/MainRoutes';
import LoginRoutes from 'routes/AuthenticationRoutes';

// ==============================|| APP ||============================== //

const queryClient = new QueryClient();

const App = () => {
  const customization = useSelector((state) => state.customization);
  const signed = useSelector((state) => state.user.signed);
  const [isSignedIn, setIsSignedIn] = useState(false);

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

  const routes = useMemo(() => {
    return signed ? MainRoutes : LoginRoutes;
  }, [signed]);

  const router = createBrowserRouter([routes]);

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
