import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import store from './app/store';
import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';


const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Provider store={store}>
          <Routing />
        </Provider>
        <CssBaseline />
      </BrowserRouter>
    </SnackbarProvider>
  );
};

export default App;