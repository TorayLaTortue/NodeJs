import React from 'react';
import { Typography, Stack, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Background from '@/components/Layout/Background';
import ProfilInfo from '../../services/Profil';

const Profile = () => {
  
  return (
    <div>
      <Background >
        <ProfilInfo/>
      </Background>
    </div>
  );
};

export default Profile;
