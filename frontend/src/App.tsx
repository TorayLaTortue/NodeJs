import { BrowserRouter, Link } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import React from 'react';
import { handleClick , handleSubmit , RedirectButton } from '@/components/Click/Click';

const App = () => {
  return (
    <BrowserRouter>
        <form onSubmit={handleSubmit}>
            <input type='text' name='my_input' defaultValue='Tapez votre texte' />
            <button type='submit'>Entrer</button>
        </form>
        <RedirectButton route="/login" />
        <Link to="/Register">Questionnaire</Link>


      <CssBaseline />
      <Routing />
    </BrowserRouter>
  );
};

export default App;
