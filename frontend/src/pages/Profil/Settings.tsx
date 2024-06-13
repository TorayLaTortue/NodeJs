import React, { useEffect, useState } from 'react';
import Background from '@/components/Layout/Background';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import { fetchUserById, UpdateUserById } from '@/features/user/userServices';
import { RequestState } from '@/types/appTypes';
import { TextField, Button } from '@mui/material';

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
    const updatedUser = { userId: id, displayName, photoURL, email };
    dispatch(UpdateUserById(updatedUser));
  };

  return (
    <div>
      <Background>
        <TextField
          required
          id="outlined-required"
          color="info"
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          color="info"
          label="Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          color="info"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          >
            Update User
          </Button>
        )}
      </Background>
    </div>
  );
};

export default Settings;
