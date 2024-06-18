import React, { useState } from 'react';
import { signInUser } from '@/features/auth/authServices';
import { Box, TextField, Button } from '@mui/material';
import { BoxStyleForm } from '@/components/Template/BoxStyle';
import { useNavigate } from 'react-router-dom';
import { RoutesType } from '@/types/routeTypes';
import { useAppSelector } from '@/app/store';
import Background from '@/components/Layout/Background';
import { RequestState } from '@/types/appTypes';
import { userSelectors } from '@/features/user/userSlice';

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
    } catch (error: any) {
      console.error('Error signing in:', error);
    }
  };

  const handleNavigate = () => {
    navigate(RoutesType.Register);
  };

  return (
    <div>
      <h2>Login</h2>
      <Background>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
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
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          )}
          <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handleNavigate}>
            No account?
          </Button>
        </Box>
      </Background>
    </div>
  );
};

export default Authorized;
