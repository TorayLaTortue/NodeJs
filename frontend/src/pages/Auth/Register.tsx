import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { BoxStyleForm } from '@/components/Template/BoxStyle';
import { postNewUser } from '@/features/user/userServices';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import { RequestState } from '@/types/appTypes';
import Background from '@/components/Layout/Background';
import { RoutesType } from '@/types/routeTypes';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const dispatch = useAppDispatch();
  const { status, data, error } = useAppSelector(userSelectors.selectUserState);
  const navigate = useNavigate();

  const handleRegisterUser = () => {
    dispatch(postNewUser({ displayName, password, photoURL, email }));
  };

  const handleNavigate = () => {
    navigate(RoutesType.Login);
  };

  return (
    <div>
      <h2>Register</h2>
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
            <TextField
              required
              id="outlined-required"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={BoxStyleForm}
            />
          {error ? (
              <>Oh no, there was an error</>
            ) : status === RequestState.pending ? (
              <>Loading...</>
            ) : (        <Button
                variant="contained"
                color="secondary"
                onClick={handleRegisterUser}
                sx={{ mt: 2 }}
              >
                Register
              </Button>
              )}

            <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handleNavigate}>
            Already have an account ?
          </Button>
          </Box>
      </Background>
    </div>
  );
};

export default Register;
