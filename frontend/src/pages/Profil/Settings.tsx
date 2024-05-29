import React from 'react';
import Background from '@/components/Layout/Background';
import ProfilInfo from '../../controllers/ProfilControllers';
import UpdateUser from '@/controllers/UpdateUserControllers';

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
