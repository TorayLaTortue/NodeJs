import React, { useMemo } from 'react';
import { Routes, Route, PathRouteProps, Navigate, Outlet, Link } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home/Home';
import AllUser from '@/pages/TestRoutes/AllUser';
import { useAppSelector } from '@/app/store';
import { selectUserInfo, selectUserIsAuthentificated } from '@/features/user/userSelectors';
import Profile from '@/pages/Profile/Profile';
import Command from '@/pages/Command/Command';
import { PrivateLayout } from '@/components/Layout/PrivateLayout';
import { Roles } from '@/features/user/userType';
import { PublicLayout } from '@/components/Layout/PublicLayout';

const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/auth" element={<PublicRoute/>}>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
    </Route>

    <Route path="/dashboard"  element={<PrivateRoute/>} >

      <Route path="/dashboard/admin" element={<RestrictedRoute roles={[Roles.admin]} />}>
        <Route path="/dashboard/admin/users" element={<AllUser />} />
        <Route path="/dashboard/admin/users/:id" element={<Profile />}/>

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

const PublicRoute = () => {
  const isAthenttificated = useAppSelector(selectUserIsAuthentificated);
  return !isAthenttificated ? (
    <PublicLayout>
      <Outlet/>
      </PublicLayout>
  ) : <Navigate to='/dashboard'/>;
}

const PrivateRoute = () => {
  const isAthenttificated = useAppSelector(selectUserIsAuthentificated);
  return isAthenttificated ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
   ) : <Navigate to='/'/>;
}

const RestrictedRoute = (props: { roles: Roles[] }) => {
  const isAthenttificated = useAppSelector(selectUserIsAuthentificated);
  const user = useAppSelector(selectUserInfo);

  return isAthenttificated && user && props.roles.includes(user.role) ? <Outlet/> : <div>Access denied</div>;
}

export default Routing;
