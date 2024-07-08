import React, { useState } from 'react';
import { signInUser } from '@/features/auth/authServices'; // Remplacez par le service de connexion approprié
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RoutesType } from '@/types/routeTypes';
import { useAppSelector } from '@/app/store';
import Background from '@/components/Layout/Background'; // Assurez-vous que ce composant existe dans votre projet
import { RequestState } from '@/types/appTypes';
import { userSelectors } from '@/features/user/userSlice';
import { AppThemeProvider } from '@/themes/AppThemeProvider'; // Assurez-vous que ce composant existe dans votre projet

const Authorized = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { status, error } = useAppSelector(userSelectors.selectUserState);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await signInUser(email, password);
      if (!user) {
        throw new Error('User not found');
      }
      // Vous pouvez rediriger l'utilisateur ou effectuer d'autres actions après la connexion
      navigate(RoutesType.Home); // Exemple de redirection après connexion
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleNavigate = () => {
    navigate(RoutesType.Register); // Redirection vers la page d'inscription
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
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{ input: { color: 'text.primary' }, label: { color: 'text.primary' } }}
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
                  sx={{ input: { color: 'text.primary' }, label: { color: 'text.primary' } }}
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
                    Login
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
                  No account?
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Background>
    </AppThemeProvider>
  );
};

export default Authorized;
