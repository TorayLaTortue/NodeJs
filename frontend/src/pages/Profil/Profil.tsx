import React, { useEffect } from 'react';
import Background from '@/components/Layout/Background';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import { fetchUserById } from '@/features/user/userServices';
import { RequestState } from '@/types/appTypes';
import UserCard from '@/components/Box/UserCard';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { status, data, error } = useAppSelector(userSelectors.selectUserState);
  const id: string = useAppSelector((state) => state.user.data.uid);

  useEffect(() => {
      dispatch(fetchUserById(id))
  }, [dispatch]);


  return (
    <div>
      <Background>
        {error ? (
          <>Oh no, there was an error</>
        ) : status === RequestState.pending ? (
          <>Loading...</>
        ) : data ? (
          <UserCard
            displayName={data.displayName}
            photoURL={data.photoURL}
            role={data.role}
          />
        ) : null}
      </Background>
    </div>
  );
};

export default Profile;
