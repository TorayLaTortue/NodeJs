export enum RoutesType {
    Home = '/',
    Logout = '/logout',
    Login = '/auth/login',
    Register = '/auth/register',
    AuthNotFound = '/auth/*',
    
    DashboardAdminHub = '/dashboard/admin/hub',
    DashboardAdminUsers = '/dashboard/admin/users',
    DashboardAdminUser = '/dashboard/admin/user',
    DashboardAdminNotFound = '/dashboard/admin/*',
    DashboardAdminRedirect = '/dashboard/admin',
    
    ProfilUser = '/profil/user',
    ProfilSettings = '/profil/settings',
    ProfilNotFound = '/profil/*',
    ProfilRedirect = '/profil/profile',

    GlobalNotFound = '*',
}
