import React from 'react';
import Background from '@/components/Layout/Background';
import ProfilInfo from '../../services/Profil';
import UpdateUser from '@/services/UpdateUser';

const Profile = () => {
  
  return (
    <div>
      <Background >
        <ProfilInfo/>
        <UpdateUser/>
      </Background>
    </div>
  );
};

export default Profile;
