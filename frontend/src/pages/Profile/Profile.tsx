import React from 'react';
import { Typography, Stack, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const Profile = () => {
  
  // Get the userId param from the URL.
  const { id } = useParams<{ id: string }>();
  
  return (
    <Container sx={{ py: 2, position: 'relative' }}>
        
      <Stack gap={1} my={2}>
        <Typography textAlign="center" variant="h2">
          Profile page {id}
        </Typography>
        <Typography textAlign="center" variant="subtitle1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ratione cupiditate nam, itaque officia, facilis, laborum aperiam voluptates iure cum tempora et qui temporibus quisquam porro possimus quibusdam maiores quasi.
        </Typography>
      </Stack>

    </Container>
  );
};

export default Profile;
