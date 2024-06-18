import React, { useState } from 'react';
import Background from '@/components/Layout/Background';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import { fetchUserById } from '@/features/user/userServices';
import { RequestState } from '@/types/appTypes';
import UserCard from '@/components/Box/UserCard';
import { BoxStyleForm } from '@/components/Template/BoxStyle';
import { Box, TextField, Button } from '@mui/material';

const SearchUser = () => {
  const dispatch = useAppDispatch();
  const { status, user, error } = useAppSelector(userSelectors.selectUserState);

  const [userId, setUserId] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleFindUser = () => {
    dispatch(fetchUserById(userId));
  };

  const userInfo: string[] = user ? [
    `Display Name: ${user.displayName}`,
    `Email: ${user.email}`,
    `Role: ${user.role}`,
  ] : [];

  return (
    <div>
      <Background>
        <Box component="form" sx={{ ...BoxStyleForm }}>
          <TextField
            label="User ID"
            value={userId}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }} // Add margin bottom to the text field
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFindUser}
            sx={{ mt: 2 }} // Add margin top to the button
          >
            Search User
          </Button>
        </Box>
        {error ? (
          <>Oh no, there was an error</>
        ) : status === RequestState.pending ? (
          <>Loading...</>
        ) : user ? (
          <UserCard
            info={userInfo}
            photoURL={user.photoURL}
          />
        ) : null}
      </Background>
    </div>
  );
};

export default SearchUser;
