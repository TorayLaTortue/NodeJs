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
import { Pages, MenuType } from '@/types/appTypes';
import { RoutesType } from '@/types/routeTypes';

function ResponsiveAppBar() {
  const { role, displayName, photoURL } = useAppSelector((state) => state.user.data);

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
  };

  const handleLogoClick = () => {
    navigate(RoutesType.Home);
  };

  useEffect(() => {
    if (isAuth) {
      setSettingsMenuItems([
        { label: Pages.Profile, path: RoutesType.ProfilUser },
        { label: Pages.Settings, path: RoutesType.ProfilSettings },
        { label: Pages.Logout, path: RoutesType.Logout }
      ]),
      setPagesMenuItems([
       // { label: Pages.Home, path: Routes.Login }, Kinda useless
      ]);
      setPagesMenuItems([
          ...(role === Roles.admin) ? [
            { label: Pages.DashboardHub, path: RoutesType.DashboardAdminHub }
          ] : [
            // empty...
          ]
        ]);
    } else {
      setPagesMenuItems([
        { label: Pages.Login, path: RoutesType.Login },
      ]);
      setSettingsMenuItems([
        { label: Pages.Login, path: RoutesType.Login }
      ]);
    }
  }, [isAuth]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src={''} onClick={handleLogoClick} style={{ cursor: 'pointer' }} /> {/* Logo */}
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
            {/*Titre*/}
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
                  <Avatar alt={displayName} src={photoURL} style={{ cursor: 'pointer' }} />
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
