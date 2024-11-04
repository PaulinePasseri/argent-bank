import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile, setError } from '../features/userSlice';
import { setAuthToken, getUserProfile, updateUserProfile } from '../services/api';
import Account from "../components/Account/account";
import { useNavigate } from 'react-router-dom';

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, error } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          const userData = await getUserProfile();
          dispatch(setUserProfile(userData));
          setNewFirstName(userData.firstName);
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewFirstName(firstName);
  };

  const handleSaveClick = async () => {
    try {
      await updateUserProfile({ firstName: newFirstName });
      dispatch(setUserProfile({ firstName: newFirstName }));
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating user profile:', err);
      dispatch(setError('Failed to update profile'));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <div>
            <h1>Edit user info</h1>
            <label>First name : </label>
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              placeholder="Enter new name"
            />
            <div className="buttons">
              <button onClick={handleSaveClick} className="edit-button">Save</button>
              <button onClick={handleCancelClick} className="edit-button">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h1>Welcome back<br />{firstName || 'User'}!</h1>
            <button onClick={handleEditClick} className="edit-button">Edit Name</button>
          </>
        )}
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
