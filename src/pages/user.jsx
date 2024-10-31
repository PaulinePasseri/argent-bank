import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile, setError } from '../features/userSlice';
import { setAuthToken, getUserProfile } from '../services/api';
import Account from "../components/Account/account";
import { useNavigate } from 'react-router-dom';

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, error } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          const userData = await getUserProfile();
          dispatch(setUserProfile(userData));
        } catch (err) {
          console.error('Error fetching user profile:', err);
          dispatch(setError(err.response?.data?.message || 'An error occurred while fetching user profile'));
          navigate('/signin');
        }
      } else {
        navigate('/signin');
      }
      setLoading(false);
    };

    fetchProfile();
  }, [dispatch, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{firstName || 'User'}!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account 
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account 
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account 
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
}