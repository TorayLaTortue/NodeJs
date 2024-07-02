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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            sx={{
              width: 75,
              height: 75,
              borderRadius: '40%',
              objectFit: 'cover',
              marginRight: 2,
            }}
            src={photoURL}
            alt="User"
          />
          <Box>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              User Information
            </Typography>
            {info.map((value, index) => (
              <Typography key={index} variant="body1" component="div" sx={{ fontSize: 16, marginBottom: 1 }}>
                {value}
              </Typography>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
