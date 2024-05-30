import { useState, MouseEvent, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/store';
import { selectIsAuthentificated } from '@/features/auth/authSelectors';
import BadgeConnected from '../Badge/StyldeBadge';
import { Roles } from '@/features/user/userType';

enum Pages {
  Home = 'Home',
  Profile = 'Profile',
  Settings = 'Settings',
  Logout = 'Logout',
  Login = 'Login',
  DashboardAdmin = 'Dashboard Admin',
  DashboardUser = 'Dashboard User',
}

type MenuType = {
  label: Pages;
  path: string;
};

/* const pages: MenuType[] = [
  { label: Pages.Home, path: '/' },
];
const settings: MenuType[] = []; */

function ResponsiveAppBar() {
  const { role, displayName, photoURL } = useAppSelector((state) => state.user.info);
  console.log(displayName, photoURL,role);

  const isAuth = useAppSelector(selectIsAuthentificated);
  const navigate = useNavigate();

  // Menu items states
  const [pagesMenuItems, setPagesMenuItems] = useState<MenuType[]>([{ label: Pages.Home, path: '/' }]);
  const [settingsMenuItems, setSettingsMenuItems] = useState<MenuType[]>([]);

  // Menu state
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (page: MenuType) => {
    handleCloseNavMenu();
    navigate(page.path);
  }
  
  useEffect(() => {
    if (isAuth) {
      setSettingsMenuItems([
        { label: Pages.Profile, path: '/profil/user' },
        { label: Pages.Settings, path: '/profil/settings' },
        { label: Pages.Logout, path: '/logout' }
      ]),
      setPagesMenuItems([
        { label: Pages.Home, path: '/' },
      ]);
      setPagesMenuItems([
          ...(role === Roles.admin) ? [
            { label: Pages.DashboardAdmin, path: '/dashboard/admin/hub' }
          ] : [
            // empty...
          ]
        ])
    } else {
      setPagesMenuItems([
        { label: Pages.Home, path: '/' },
      ]);
      setSettingsMenuItems([
        { label: Pages.Login, path: '/auth/login' }
      ]);
    }
  }, [isAuth]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src={'https://cdn.discordapp.com/attachments/831571160114266112/1229513804380114954/image.png?ex=665041b6&is=664ef036&hm=9f942d634ca4b767e732f298f4bfd0e44992388cedfb9d7c6b402b8bd6052535&'} /> {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Toray
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pagesMenuItems.map((page) => (
                <MenuItem 
                  key={page.label} 
                  onClick={() => handleNavigate(page)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Toray
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pagesMenuItems.map((page, id) => (
              <Button
                key={id}
                onClick={() => handleNavigate(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <BadgeConnected>
                <Avatar alt={displayName} src={photoURL} />
                </BadgeConnected>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingsMenuItems.map((setting) => (
                <MenuItem 
                  key={setting.label} 
                  onClick={() => handleNavigate(setting)}
                  >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>

        </Toolbar>

      </Container>

    </AppBar>
  );
}

export default ResponsiveAppBar;
