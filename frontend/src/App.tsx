import { BrowserRouter, Link } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import React from 'react';


const App = () => {
  return (
    <BrowserRouter>
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