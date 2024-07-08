import React from 'react';
import { Typography, Stack, Container, Box } from '@mui/material';
import Counter from '@/components/Counter/Counter';

const Home = () => {
  return (
    <Container sx={{ py: 2, position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <Stack gap={1} my={2}>
        <Typography textAlign="center" variant="h2">
          Home page
        </Typography>
        <Typography textAlign="center" variant="subtitle1">
          Welcome to Toray website
        </Typography>
      </Stack>
      <Box sx={{ position: 'absolute', bottom: 30, width: '100%' }}>
        <Counter />
      </Box>
    </Container>
  );
};

export default Home;
