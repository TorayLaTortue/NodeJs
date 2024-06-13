import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/store';
import { selectAuthIdToken } from '@/features/auth/authSelectors';
import { UserType } from '@/features/user/userType';

const UpdateUser = () => {
  const idToken = useAppSelector(selectAuthIdToken);
  const {uid, displayName, photoURL, email } = useAppSelector((state) => state.user.data);
  const [name, setName] = useState(displayName);
  const [mail, setEmail] = useState(email);
  const [photo, setPhotoURL] = useState(photoURL);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateUser = async (userId: string, displayName: string, email: string, photoURL: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ displayName, email, photoURL })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (!responseData || !responseData.user) {
        throw new Error('Invalid response data');
      }
      setSuccess('User updated successfully.');
      setError(null);
    } catch (error) {
      console.error('There was a problem with the update operation:', error);
      setError('Failed to update user data.');
      setSuccess(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    useEffect(() => {
      e.preventDefault();
    if (uid) {
      updateUser(uid, name, mail, photo);
    }
    }, []);
  };

  return (
    <div>
      <h2>Update User</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="displayName">Name:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="photoURL">Photo URL:</label>
          <input
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
