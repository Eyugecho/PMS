import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContext } from 'context/AuthContext';
import { useMemo, useState } from 'react';


// ==============================|| APP ||============================== //

const queryClient = new QueryClient();

const App = () => {
  const customization = useSelector((state) => state.customization);
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
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <AuthContext.Provider value={authContext}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <NavigationScroll>
              <RouterProvider router={router} />
            </NavigationScroll>
            <ToastContainer />
          </QueryClientProvider>
        </AuthContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
