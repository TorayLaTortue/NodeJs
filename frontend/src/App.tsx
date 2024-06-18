import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import store from './app/store';
import React from 'react';
import { Provider } from 'react-redux';


const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routing />
      </Provider>
      <CssBaseline />
    </BrowserRouter>
  );
};

export default App;