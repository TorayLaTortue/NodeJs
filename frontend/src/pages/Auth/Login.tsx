import React from 'react';
import { Link } from 'react-router-dom';
import Authorized from '@/services/Login';

const Login = () => {

  return <div>
    <h2>Connexion</h2>
    <Link to="/auth/register">Pas de compte ?</Link>
      <Authorized />
    </div>;
};

export default Login;
