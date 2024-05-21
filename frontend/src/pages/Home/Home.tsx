import React from 'react';
import TemplateTester from '@/components/TemplateTester/TemplateTester';
import { Typography, Stack, Container } from '@mui/material';
import Counter from '@/components/Counter/Counter';
import { useAppSelector } from '@/app/store';
import { selectUserIdToken } from '@/features/user/userSelectors';

const Home = () => {
  const token = useAppSelector(selectUserIdToken);
  console.log('Token', token);

  return (
    <Container sx={{ py: 2, position: 'relative' }}>

        {/* <form onSubmit={handleSubmit}>
            <input type='text' name='my_input' defaultValue='Tapez votre texte' />
            <button type='submit'>Entrer</button>
        </form> */}
              
      <Stack gap={1} my={2}>
        <Typography textAlign="center" variant="h2">
          Vite-MUI-TS Template
        </Typography>
        <Typography textAlign="center" variant="subtitle1">
          React + TS + Vite + Redux + RTK + MUI + RRD + Prettier
        </Typography>
      </Stack>

      <TemplateTester />
      <Counter />
    </Container>
  );
};

export default Home;
