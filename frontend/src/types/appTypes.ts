
// Request status enum
export enum RequestState {
    pending = 'pending',
    fulfilled = 'fulfilled',
    rejected = 'rejected',
    idle = 'idle',
    errorMessage = ''
} 

export enum Pages {
    Home = 'Home',
    Profile = 'Profile',
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
