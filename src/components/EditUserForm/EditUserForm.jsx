export const EditUserForm = ({ newUserName, firstName, lastName, onSave, onCancel, onChange, isSaving }) => (
    <div className='edit-form'>
      <h1>Edit user info</h1>
      <div>
        <label>User name: </label>
        <input
          className="editName"
          type="text"
          value={newUserName}
          onChange={onChange}
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
        <button onClick={onSave} className="edit-button" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onCancel} className="edit-button">Cancel</button>
      </div>
    </div>
  );