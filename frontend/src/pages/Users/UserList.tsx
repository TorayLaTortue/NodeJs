// users.tsx
import React, { useEffect } from 'react';
import Background from '@/components/Layout/Background';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userSelectors } from '@/features/user/userSlice';
import { fetchAllUsers } from '@/features/user/userServices';
import { RequestState } from '@/types/appTypes';
import UserCard from '@/components/Box/UserCard';
import { useNavigate } from 'react-router-dom';
import { RoutesType } from '@/types/routeTypes';
import { Button } from '@mui/material';
import { UserType } from '@/features/user/userType';

const UserList = () => {
  const dispatch = useAppDispatch();
  const { status, users, error } = useAppSelector(userSelectors.selectUserState);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleNavigate = (path: RoutesType) => {
    navigate(path);
  };

  return (
    <div>
      <Background>
        {error ? (
          <>Oh no, there was an error</>
        ) : status === RequestState.pending ? (
          <>Loading...</>
        ) : (
          users?.map((user: UserType) => (
            <UserCard
              key={user.uid}
              info={[
                `Display Name: ${user.displayName}`,
                `Email: ${user.email}`,
                `Role: ${user.role}`,
              ]}
              photoURL={user.photoURL}
            />
          ))
        )}
      </Background>
      <Button
        onClick={() => handleNavigate(RoutesType.DashboardAdminHub)}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Hub
      </Button>
    </div>
  );
};

export default UserList;
