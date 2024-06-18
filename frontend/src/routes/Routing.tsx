import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home/Home';
import { useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import Profile from '@/pages/Profil/Profil';
import { PrivateLayout } from '@/components/Layout/PrivateLayout';
import { Roles } from '@/features/user/userType';
import { PublicLayout } from '@/components/Layout/PublicLayout';
import { selectIsAuthentificated } from '@/features/auth/authSelectors';
import Settings from '@/pages/Profil/Settings';
import HubAdmin from '@/pages/Admin/hubAdmin';
import { signOutUser } from '@/features/auth/authServices';
import { RoutesType } from '@/types/routeTypes';
import UserList from '@/pages/Users/UserList';
import SearchUser from '@/pages/Users/SearchUser';

const Routing = () => (
  <Routes>
    
    <Route path="/" element={<HomeRoute />} />
    <Route path="/logout" Component={() => {  signOutUser(); return <Navigate to={RoutesType.Home} /> }} />

    <Route path="/auth" element={<PublicRoute />}>
        <Route path={RoutesType.Login} element={<Login />} />
        <Route path={RoutesType.Register} element={<Register />} />
        <Route path={RoutesType.AuthNotFound} element={<div>404 auth Not Found</div>} />
      </Route>

      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="/dashboard/admin" element={<RestrictedRoute roles={[Roles.admin]} />}>
          <Route path={RoutesType.DashboardAdminHub} element={<HubAdmin />} />
          <Route path={RoutesType.DashboardAdminUsers} element={<UserList />} />
          <Route path={RoutesType.DashboardAdminUser} element={<SearchUser />} />
          <Route path={RoutesType.DashboardAdminNotFound} element={<div>404 Dashboard/admin Not Found</div>} />
          <Route path={RoutesType.DashboardAdminRedirect} element={<Navigate to={RoutesType.ProfilRedirect} />} />
        </Route>
      </Route>

      <Route path="/profil" element={<ConnectedRoute />}>
        <Route path={RoutesType.ProfilUser} element={<Profile />} />
        <Route path={RoutesType.ProfilSettings} element={<Settings />} />
        <Route path={RoutesType.ProfilNotFound} element={<div>404 profil Not Found</div>} />
        <Route path={RoutesType.ProfilRedirect} element={<Navigate to={RoutesType.ProfilUser} />} />
        <Route path={RoutesType.GlobalNotFound} element={<div>404 Global Not Found</div>} />
      </Route>
    </Routes>
);

const HomeRoute = () => {
  return (
    <PublicLayout>
      <Outlet/>
      <Home/>
    </PublicLayout>
  )
}

const PublicRoute = () => {
  const isAthenttificated = useAppSelector(selectIsAuthentificated);
  return !isAthenttificated ? (
    <PublicLayout>
      <Outlet/>
    </PublicLayout>
  ) : <Navigate to='/'/>; //R'envoyer sur le home si l'user est connecter
}

const ConnectedRoute = () => {
  const isAthenttificated = useAppSelector(selectIsAuthentificated);
  return isAthenttificated ? (
    <PublicLayout>
      <Outlet/>
    </PublicLayout>
  ) : <Navigate to='/'/>; //R'envoyer sur le home si l'user est pas connecter
}

const AdminRoute = () => {
  const isAthenttificated = useAppSelector(selectIsAuthentificated);
  return isAthenttificated ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
   ) : <Navigate to='/'/>; // R'envoyer sur le home si l'user n'est pas connecter
}

const RestrictedRoute = (props: { roles: Roles[] }) => {
  const isAthenttificated = useAppSelector(selectIsAuthentificated);
  const user = useAppSelector(userSelectors.selectUserInfo);

  return isAthenttificated && user && props.roles.includes(user.role) ? <Outlet/> : <div>Access denied</div>;
}



export default Routing;
