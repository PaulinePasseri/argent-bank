import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile, setError, setUserName } from '../features/userSlice'; 
import { setAuthToken, getUserProfile, updateUserProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AccountsList } from '../components/AccountsList/AccountsList';
import { EditUserForm } from '../components/EditUserForm/EditUserForm';

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, userName, error } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
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
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    setNewUserName(userName || ''); 
  }, [userName]);

  const handleEditClick = useCallback(() => setIsEditing(true), []);

  const handleCancelClick = useCallback(() => {
    setIsEditing(false);
    setNewUserName(userName || ''); 
  }, [userName]);

  const handleSaveClick = useCallback(async () => {
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
  }, [newUserName, dispatch]);

  const headerContent = useMemo(() => {
    if (isEditing) {
      return (
        <EditUserForm
          newUserName={newUserName}
          firstName={firstName}
          lastName={lastName}
          onSave={handleSaveClick}
          onCancel={handleCancelClick}
          onChange={(e) => setNewUserName(e.target.value)}
          isSaving={isSaving}
        />
      );
    } else {
      return (
        <>
          <h1>Welcome back<br />{firstName || 'User'}!</h1> 
          <button onClick={handleEditClick} className="edit-button">Edit Username</button>
        </>
      );
    }
  }, [isEditing, newUserName, firstName, lastName, handleSaveClick, handleCancelClick, isSaving, handleEditClick]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="main bg-dark">
      <div className="header">
        {headerContent}
      </div>
      <AccountsList/>
    </main>
  );
}