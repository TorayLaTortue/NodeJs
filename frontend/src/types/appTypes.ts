
// Request status enum
export enum RequestState {
    pending = 'pending',
    fulfilled = 'fulfilled',
    rejected = 'rejected',
    idle = 'idle'
} 

export enum Pages {
    Home = 'Home',
    Profile = 'Profile',
    Settings = 'Settings',
    Logout = 'Logout',
    Login = 'Login',
    DashboardHub = 'Hub Admin',
    DashboardSearchUser = 'Search User',
    DashboardUserList = 'User List',
  }
  
export type MenuType = {
    label: Pages;
    path: string;
  };
