import * as React from 'react';
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
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/store';
import { removeUser } from '@/features/user/userSlice';
import { selectUserInfo } from '@/features/user/userSelectors';

function ResponsiveAppBarHomePrivate() {
  const userInfo= useAppSelector(selectUserInfo);
  let pages: { label: string; path: string | null; }[] = [];
  let settings: { label: string; path: string | null; }[] = [];

   pages = [
    { label: 'MainPage', path: '/dashboard/admin' },
    { label: 'Settings', path: '/dashboard/settings' },
    { label: 'Search User', path: '/dashboard/admin/user' },
    { label: 'User List', path: '/dashboard/admin/users' },
  ];
  
   settings = [
    { label: 'MainPage', path: '/dashboard/admin' },
    { label: 'Settings', path: '/dashboard/settings' },
    { label: 'Search User', path: '/dashboard/admin/user' },
    { label: 'User List', path: '/dashboard/admin/users' },
  ];

  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(removeUser());
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
              {pages.map((page) => (
                <MenuItem 
                  key={page.label} 
                  onClick={page.path ? handleCloseNavMenu : logout}
                >
                  <Typography textAlign="center">
                    {page.path ? (
                      <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page.label}
                      </Link>
                    ) : (
                      page.label
                    )}
                  </Typography>
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
            {pages.map((page) => (
              <Button
                key={page.label}
                component={page.path ? Link : 'button'}
                to={page.path ? page.path : undefined}
                onClick={page.path ? handleCloseNavMenu : logout}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userInfo?.displayName} src={userInfo?.photoURL} />
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
              {settings.map((setting) => (
                <MenuItem 
                  key={setting.label} 
                  onClick={setting.path ? handleCloseUserMenu : logout}
                >
                  <Typography textAlign="center">
                    {setting.path ? (
                      <Link to={setting.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {setting.label}
                      </Link>
                    ) : (
                      setting.label
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBarHomePrivate;