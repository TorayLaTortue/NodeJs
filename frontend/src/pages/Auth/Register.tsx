import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import { BoxStyleForm } from '@/components/Template/BoxStyle';
import { postNewUser } from '@/features/user/userServices';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import { RequestState } from '@/types/appTypes';
import Background from '@/components/Layout/Background';
import { RoutesType } from '@/types/routeTypes';
import { useNavigate } from 'react-router-dom';
import { AppThemeProvider } from '@/themes/AppThemeProvider'; 

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png");

  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(userSelectors.selectUserState);
  const navigate = useNavigate();

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(postNewUser({ displayName, password, photoURL, email }));
      navigate(RoutesType.Login); 
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleNavigate = () => {
    navigate(RoutesType.Login);
  };

  return (
    <AppThemeProvider>
      <Background>
        <Box
          sx={{
            maxWidth: 800,
            mx: 'auto',
            mt: 4,
            p: 4,
            border: '2px solid',
            borderColor: 'grey.200',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'background.paper'
          }}
        >
          <Typography
            variant="h2" align="center" color="text.secondary" gutterBottom>
            Register
          </Typography>
          <Box component="form" onSubmit={handleRegisterUser}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="displayName"
                  label="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  fullWidth
                  sx={BoxStyleForm}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="photoURL"
                  label="Photo URL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  fullWidth
                  sx={BoxStyleForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={BoxStyleForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  sx={BoxStyleForm}
                />
              </Grid>
              {error ? (
                <Grid item xs={12}>
                  <Typography color="error">Oh no, there was an error</Typography>
                </Grid>
              ) : status === RequestState.pending ? (
                <Grid item xs={12}>
                  <Typography>Loading...</Typography>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ 
                      backgroundColor: 'secondary.main',
                      color: 'secondary.contrastText',
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                      },
                    }}
                    fullWidth
                  >
                    Register
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  sx={{ 
                    color: 'primary.main', 
                    borderColor: 'primary.main', 
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      borderColor: 'primary.dark',
                    } 
                  }}
                  fullWidth
                  onClick={handleNavigate}
                >
                  Already have an account?
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Background>
    </AppThemeProvider>
  );
};

export default Register;
