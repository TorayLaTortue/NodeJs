import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { RoutesType } from '@/types/routeTypes';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

type UserCardProps = {
  displayName: string;
  photoURL: string;
  role: string;
};

const UserCard: React.FC<UserCardProps> = ({ displayName, photoURL, role }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: RoutesType) => {
    navigate(path);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {bull}User Information
        </Typography>
        <Typography variant="h5" component="div">
          {displayName}
        </Typography>
        <Typography variant="h5" component="div">
          Role: {role}
        </Typography>
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
          alt={role}
        />
        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => handleNavigate(RoutesType.ProfilSettings)}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Settings 
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
