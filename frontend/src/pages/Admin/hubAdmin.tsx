import React from 'react';
import { Typography, Stack, Container } from '@mui/material';

const HubAdmin = () => {
  return (
    <Container sx={{ py: 2, position: 'relative' }}>
        
      <Stack gap={1} my={2}>
        <Typography textAlign="center" variant="h2">
          Hub Admin page
        </Typography>
        <Typography textAlign="center" variant="subtitle1">
        </Typography>
      </Stack>

    </Container>
  );
};

export default HubAdmin;
