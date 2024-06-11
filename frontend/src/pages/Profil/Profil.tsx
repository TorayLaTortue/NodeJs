import React, { useEffect } from 'react';
import Background from '@/components/Layout/Background';
// import ProfilInfo from '../../controllers/ProfilControllers';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import { fetchUserById } from '@/features/user/userServices';
import { RequestState } from '@/types/appTypes';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { status, data, error } = useAppSelector(userSelectors.selectUserState);

  useEffect(() => {
      dispatch(fetchUserById('M4H4UtGSIHufQ1YCB9v2Rqu8ekwA'))
  }, [dispatch]);

  return (
    <div>
      <Background >
        {/* <ProfilInfo/> */}
        {error ? (
        <>Oh no, there was an error</>
      ) : status === RequestState.pending ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.displayName}</h3>
          <img src={data.photoURL} alt={data.role} />
        </>
      ) : null}
      </Background>
    </div>
  );
};

export default Profile;
