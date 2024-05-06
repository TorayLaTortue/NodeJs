import { BrowserRouter, Link } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import { store } from './app/store';
import Cart from './features/cart/Cart';
import React from 'react';
import { Provider } from 'react-redux';


const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
      <div className="App">
      <Cart />
        </div>
    </Provider>
      <CssBaseline />
      <Routing />
    </BrowserRouter>
  );
};

export default App;

/**
 * <RedirectButton route="/login" />
        <Link to="/Register">Questionnaire</Link>
        <UserList />
 */