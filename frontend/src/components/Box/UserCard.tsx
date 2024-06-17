import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type UserCardProps = {
  info: string[]; 
  photoURL: string;
};

const UserCard: React.FC<UserCardProps> = ({ info, photoURL }) => {

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          User Information
        </Typography>
        {info.map((value, index) => (
          <Typography key={index} variant="h5" component="div">
            {value}
          </Typography>
        ))}
        <Box
          component="img"
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            objectFit: 'cover',
            margin: '0 auto',
            display: 'block',
          }}
          src={photoURL}
          alt="User Image"
        />
      </CardContent>
    </Card>
  );
};

export default UserCard;
