import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile, setError, setName } from '../features/userSlice';
import { setAuthToken, getUserProfile, updateUserProfile } from '../services/api';
import Account from "../components/Account/account";
import { useNavigate } from 'react-router-dom';

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, error } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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
          console.error('Erreur lors de la récupération du profil utilisateur :', err);
          dispatch(setError(err.response?.data?.message || 'Une erreur est survenue lors de la récupération du profil utilisateur'));
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
    if (newFirstName.trim() === '') {
      dispatch(setError('First name cannot be empty.'));
      return;
    }
    setIsSaving(true);
    try {
      const updatedUserData = await updateUserProfile({ firstName: newFirstName });
      dispatch(setName({ firstName: newFirstName, lastName: updatedUserData.lastName }));
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating user profile:', err);
      dispatch(setError(err.response?.data?.message || 'Failed to update profile.'));
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    console.log('Current user profile:', { firstName, lastName });
  }, [firstName, lastName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <div>
            <h1>Edit user info</h1>
            <label>First name: </label>
            <input className="editName"
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              placeholder="Enter new name"
            />
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
