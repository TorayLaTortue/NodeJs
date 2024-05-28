import React from 'react';
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