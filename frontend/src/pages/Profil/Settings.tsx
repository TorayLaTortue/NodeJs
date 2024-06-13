import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import Background from '@/components/Layout/Background';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import { fetchUserById, UpdateUserById } from '@/features/user/userServices';
import { RequestState } from '@/types/appTypes';
import { BoxStyleForm } from '@/components/Template/BoxStyle';

const Settings = () => {
  const dispatch = useAppDispatch();
  const { status, data, error } = useAppSelector(userSelectors.selectUserState);
  const id: string = useAppSelector((state) => state.user.data.uid);

  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (data) {
      setDisplayName(data.displayName);
      setPhotoURL(data.photoURL);
      setEmail(data.email);
    }
  }, [data]);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  const handleUpdateUser = () => {
    dispatch(UpdateUserById({ userId: id, displayName, photoURL, email }));
  };

  return (
    <div>
      <Background>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <TextField
            required
            id="outlined-required"
            label="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            sx={BoxStyleForm}
          />
          <TextField
            required
            id="outlined-required"
            label="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            sx={BoxStyleForm}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={BoxStyleForm}
          />
          {error ? (
            <>Oh no, there was an error</>
          ) : status === RequestState.pending ? (
            <>Loading...</>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpdateUser}
              sx={{ mt: 2 }} // Add margin top to the button
            >
              Update User
            </Button>
          )}
        </Box>
      </Background>
    </div>
  );
};

export default Settings;
