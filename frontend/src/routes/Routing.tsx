import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home/Home';
import Users from '@/pages/Users/Users';
import { useAppSelector } from '@/app/store';
import { selectUserInfo } from '@/features/user/userSelectors';
import Profile from '@/pages/Profile/Profile';
import Command from '@/pages/Command/Command';
import { PrivateLayout } from '@/components/Layout/PrivateLayout';
import { Roles } from '@/features/user/userType';
import { PublicLayout } from '@/components/Layout/PublicLayout';
import HomeLayout from '@/components/Layout/HomeLayout';
import User from '@/pages/Users/User';
import { selectIsAuthentificated } from '@/features/auth/authSelectors';

const Routing = () => (
  <Routes>
    
    <Route path="/" element={<HomeRoute />} />

    <Route path="/auth" element={<PublicRoute/>}>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
    </Route>

    <Route path="/dashboard"  element={<PrivateRoute/>} >

      <Route path="/dashboard/admin" element={<RestrictedRoute roles={[Roles.admin]} />}>
        <Route path="/dashboard/admin/users" element={<Users />} />
        <Route path="/dashboard/admin/user" element={<User />}/>
        <Route path="/dashboard/admin/*" element={<div>404 Dashboard/admin Not Found</div>} />
        <Route path="/dashboard/admin" element={<Navigate to='/dashboard/profile'/>} />
      </Route>
      
      <Route path="/dashboard/profile" element={<Profile />}/>
      <Route path="/dashboard/command" element={<Command />}/>
      
      <Route path="/dashboard/*" element={<div>404 Dashboard Not Found</div>} />
      <Route path="/dashboard" element={<Navigate to='/dashboard/profile'/>} />
    </Route>

    <Route path="*" element={<div>404 Global Not Found</div>} />
  </Routes>
);

const HomeRoute = () => {
  return (
    <HomeLayout>
      <Outlet/>
      <Home/>
    </HomeLayout>
  )
}

const PublicRoute = () => {
  const isAthenttificated = useAppSelector(selectIsAuthentificated);
  return !isAthenttificated ? (
    <PublicLayout>
      <Outlet/>
    </PublicLayout>
  ) : <Navigate to='/'/>; //R'envoyer sur le dashboard si l'user est connecter
}

const PrivateRoute = () => {
  const isAthenttificated = useAppSelector(selectIsAuthentificated);
  return isAthenttificated ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
   ) : <Navigate to='/'/>; // R'envoyer sur le home si l'user n'est pas connecter
}

const RestrictedRoute = (props: { roles: Roles[] }) => {
  const isAthenttificated = useAppSelector(selectIsAuthentificated);
  const user = useAppSelector(selectUserInfo);

  return isAthenttificated && user && props.roles.includes(user.role) ? <Outlet/> : <div>Access denied</div>;
}



export default Routing;
