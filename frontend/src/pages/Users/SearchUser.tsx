import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import Background from '@/components/Layout/Background';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import { fetchUserById } from '@/features/user/userServices';
import { RequestState } from '@/types/appTypes';
import UserCard from '@/components/Box/UserCard';
import { BoxStyleForm } from '@/components/Template/BoxStyle';
import { useSnackbar } from 'notistack';

const SearchUser = () => {
  const dispatch = useAppDispatch();
  const { status, user, error } = useAppSelector(userSelectors.selectUserState);
  const [userId, setUserId] = useState('');
  const [inputError, setInputError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
    if (event.target.value.trim() !== '') {
      setInputError(false);
    }
  };

  const handleFindUser = async () => {
    if (userId.trim() === '') {
      setInputError(true); 
      enqueueSnackbar('Please enter a User ID to search for.', { variant: 'warning' });
      return;
    }

    const resultAction = await dispatch(fetchUserById(userId));
    if (fetchUserById.fulfilled.match(resultAction)) {
      enqueueSnackbar('User data fetched successfully!', { variant: 'success' });
    } else {
      enqueueSnackbar(`Failed to fetch user data: ${resultAction.error.message}`, { variant: 'error' });
    }
  };

  const userInfo: string[] = user && user.displayName && user.email && user.role ? [
    `Display Name: ${user.displayName}`,
    `Email: ${user.email}`,
    `Role: ${user.role}`,
  ] : [];

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

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
          Search User
        </Typography>

        <Box component="form" sx={{ ...BoxStyleForm }}>
          <TextField
            label="User ID"
            value={userId}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }} 
            error={inputError}
            helperText={inputError ? 'Please enter a valid User ID.' : ''} 
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFindUser}
            sx={{ mt: 2 }}
            fullWidth
          >
            Search User
          </Button>
        </Box>

        {error && <Typography color="error" align="center">Oh no, there was an error</Typography>}
        {status === RequestState.pending && <Typography align="center">Loading...</Typography>}

        {user && userInfo.length > 0 && (
          <UserCard
            info={userInfo}
            photoURL={user.photoURL || ''}
          />
        )}
      </Box>
    </Background>
  );
};

export default SearchUser;
