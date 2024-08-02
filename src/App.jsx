import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { QueryClient, QueryClientProvider } from 'react-query';

// ==============================|| APP ||============================== //

const queryClient = new QueryClient();

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <NavigationScroll>
            <ToastContainer />

            <RouterProvider router={router} />
          </NavigationScroll>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
