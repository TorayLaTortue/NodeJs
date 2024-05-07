import { RootState, useAppSelector } from '@/app/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const idToken = useAppSelector((state) => state.user.idToken);

  console.log(idToken)

  console.log(`${import.meta.env.API_URL}/api/users`)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/serveurnodejs/us-central1/api/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiRGFtaWVuIFN1cGVyYWRtaW4iLCJwaWN0dXJlIjoiIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJkYW1pZW4ucGFzcXVlcjM2MzZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF1dGhfdGltZSI6MTcxNTA5NDg5NSwidXNlcl9pZCI6Ijd0ZGhkUjRBMFZNU0oyM0FMNThrbWZ2dkR6ZXMiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRhbWllbi5wYXNxdWVyMzYzNkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9LCJpYXQiOjE3MTUwOTQ4OTUsImV4cCI6MTcxNTA5ODQ5NSwiYXVkIjoic2VydmV1cm5vZGVqcyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9zZXJ2ZXVybm9kZWpzIiwic3ViIjoiN3RkaGRSNEEwVk1TSjIzQUw1OGttZnZ2RHplcyJ9.`
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
