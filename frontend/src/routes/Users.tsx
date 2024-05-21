import { useAppSelector } from '@/app/store';
import { selectUserIdToken } from '@/features/user/userSelectors';
import { UserType } from '@/features/user/userType';
import React, { useEffect, useState } from 'react';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const idToken = useAppSelector(selectUserIdToken);

  console.log('idToken', idToken);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/serveurnodejs/us-central1/api/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ` + idToken
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (!responseData || !responseData.users || !Array.isArray(responseData.users)) {
        throw new Error('Invalid response data');
      }
      setUsers(responseData.users);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div>
      <h2>User List : </h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.uid}>
            <div>Email: {user.email}</div>
            <div>Display Name: {user.displayName}</div>
            <div>Role: {user.role}</div>
            <div>Last Sign-in Time: {user.lastSignInTime}</div>
            <div>Creation Time: {user.creationTime}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
