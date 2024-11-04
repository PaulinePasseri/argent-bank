import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile, setError, setUserName } from '../features/userSlice'; 
import { setAuthToken, getUserProfile, updateUserProfile } from '../services/api';
import Account from "../components/Account/account";
import { useNavigate } from 'react-router-dom';

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, userName, error } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          const userData = await getUserProfile();
          dispatch(setUserProfile(userData));
          setNewUserName(userData.userName || ''); 
        } catch (err) {
          console.error('Error fetching user profile:', err);
          dispatch(setError(err.response?.data?.message || 'An error occurred while fetching the user profile'));
          navigate('/signin');
        }
      } else {
        navigate('/signin');
      }
      setLoading(false);
    };
  
    fetchProfile();
  }, [dispatch, navigate]);

  useEffect(() => {
    setNewUserName(userName || ''); 
  }, [userName]);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewUserName(userName || ''); 
  };

  const handleSaveClick = async () => {
    if (newUserName.trim() === '') {
      dispatch(setError('Username cannot be empty.'));
      return;
    }
    setIsSaving(true);
    try {
      await updateUserProfile({ userName: newUserName }); 
      dispatch(setUserName(newUserName)); 
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating user profile:', err);
      dispatch(setError(err.response?.data?.message || 'Failed to update profile.'));
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <div className='edit-form'>
            <h1>Edit user info</h1>
            <div>
              <label>User name: </label>
              <input className="editName"
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)} 
                placeholder="Enter new username"
              />
            </div>
            <div>
              <label>First name: </label>
              <input
                type="text"
                value={firstName}
                readOnly
                className="editName readonlyField"
              />
            </div>
            <div>
              <label>Last name: </label>
              <input
                type="text"
                value={lastName}
                readOnly
                className="editName readonlyField"
              />
            </div>
            <div className="buttons">
              <button onClick={handleSaveClick} className="edit-button" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={handleCancelClick} className="edit-button">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h1>Welcome back<br />{firstName || 'User'}!</h1> 
            <button onClick={handleEditClick} className="edit-button">Edit Username</button>
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