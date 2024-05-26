import React from 'react';
import Authorized from '@/routes/Login';
import UserList from '@/routes/UserList';
import { Link } from 'react-router-dom';

const Login = () => {

  return <div>
    <h2>Connexion</h2>
    <Link to="/auth/register">Pas de compte ?</Link>
      <Authorized />
    </div>;
};

export default Login;
