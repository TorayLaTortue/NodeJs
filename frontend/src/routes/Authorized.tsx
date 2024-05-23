import React, { useState } from 'react';
import { setCredentials } from '@/features/user/userSlice';
import UserList from '@/routes/Users';
import { useAppDispatch } from '@/app/store';
import { signInUser } from '@/services/firebaseServices';

const Authorized = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const user = await signInUser(email, password);
      if (!user) {
        throw new Error('User not find');
      }

      dispatch(setCredentials({ user: user.info, token: user.idToken }));
      console.log("data id token", user.idToken);
      console.log("user info", user.info);
      UserList;
      
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Authorized;
