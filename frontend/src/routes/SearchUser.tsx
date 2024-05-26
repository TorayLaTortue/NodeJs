import { useAppSelector } from '@/app/store';
import { selectAuthIdToken } from '@/features/auth/authSelectors';
import { UserType } from '@/features/user/userType';
import React, { useState } from 'react';

const SearchUser: React.FC = () => {
  const idToken = useAppSelector(selectAuthIdToken);
  const [user, setUser] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (userId: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/serveurnodejs/us-central1/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (!responseData || !responseData.user) {
        throw new Error('Invalid response data');
      }
      setUserInfo(responseData.user);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError('Failed to fetch user data or ID did not match.');
      setUserInfo(null); // Clear user info if there's an error
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchUser(user);
  };

  return (
    <div>
      <h2>User Search</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User ID:</label>
          <input 
            type="text" 
            id="user" 
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {userInfo && (
        <div>
          <h3>User Information:</h3>
          <p>ID: {userInfo.uid}</p>
          <p>Name: {userInfo.displayName}</p>
          <p>Email: {userInfo.email}</p>
          <p>photoURL: {userInfo.photoURL}</p>
          <p>Role: {userInfo.role}</p>
        </div>
      )}
    </div>
  );
};

export default SearchUser;

