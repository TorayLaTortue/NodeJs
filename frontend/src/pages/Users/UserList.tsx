import React, { useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import Background from '@/components/Layout/Background';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import { fetchAllUsers } from '@/features/user/userServices';
import { RequestState } from '@/types/appTypes';
import UserCard from '@/components/Box/UserCard';
import { UserType } from '@/features/user/userType';

const UserList = () => {
  const dispatch = useAppDispatch();
  const { status, users, error } = useAppSelector(userSelectors.selectUserState);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

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
          User List
        </Typography>

        {error && (
          <Typography color="error" align="center" gutterBottom>
            Oh no, there was an error: {error}
          </Typography>
        )}

        {status === RequestState.pending ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {users?.map((user: UserType) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.uid}>
                <UserCard
                  info={[
                    `${user.displayName}`,
                    `Email: ${user.email}`,
                    `Role: ${user.role}`,
                  ]}
                  photoURL={user.photoURL || ''}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Background>
  );
};

export default UserList;
