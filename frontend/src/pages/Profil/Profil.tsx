import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import Background from '@/components/Layout/Background';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import { fetchUserById, UpdateUserById } from '@/features/user/userServices';
import { RequestState } from '@/types/appTypes';
import { BoxStyleForm } from '@/components/Template/BoxStyle';
import UserCard from '@/components/Box/UserCard';
import { useSnackbar } from 'notistack';

const UserProfileAndSettings = () => {
  const dispatch = useAppDispatch();
  const { status, data, error } = useAppSelector(userSelectors.selectUserState);
  const id: string = useAppSelector((state) => state.user.data.uid);

  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [email, setEmail] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (data) {
      setDisplayName(data.displayName);
      setPhotoURL(data.photoURL);
      setEmail(data.email);
    }
  }, [data]);

  const handleUpdateUser = async () => {
    const resultAction = await dispatch(UpdateUserById({ userId: id, displayName, photoURL, email }));
    if (UpdateUserById.fulfilled.match(resultAction)) {
      enqueueSnackbar('User updated successfully!', { variant: 'success' });
    } else {
      enqueueSnackbar(`Failed to update user: ${resultAction.error.message}`, { variant: 'error' });
    }
  };

  return (
    <Background>
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: 4,
          border: '2px solid',
          borderColor: 'grey.200',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h2" align="center" color="text.secondary" gutterBottom>
          User Profile & Settings
        </Typography>

        {error && <Typography color="error">Oh no, there was an error</Typography>}
        {status === RequestState.pending && <Typography>Loading...</Typography>}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UserCard
              info={[
                `Display Name: ${data?.displayName}`,
                `Email: ${data?.email}`,
                `Role: ${data?.role}`,
              ]}
              photoURL={data?.photoURL || ''}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="form">
              <TextField
                required
                id="displayName"
                label="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                fullWidth
                sx={{ ...BoxStyleForm, mb: 2 }}
              />
              <TextField
                required
                id="photoURL"
                label="Photo URL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                fullWidth
                sx={{ ...BoxStyleForm, mb: 2 }}
              />
              <TextField
                required
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ ...BoxStyleForm, mb: 2 }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleUpdateUser}
                sx={{ mt: 2 }}
                fullWidth
              >
                Update User
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Background>
  );
};

export default UserProfileAndSettings;
