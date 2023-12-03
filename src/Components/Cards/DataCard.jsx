




import React, { useEffect, useState } from 'react';
import './DataCard.css';
import { useDispatch } from 'react-redux';
import { deleteData, editData } from '../../Store/dataSlice';

const DataCard = ({ name, email, role, action, id, isChecked,onCheckboxChange }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedEmail, setEditedEmail] = useState(email);
    const [editedRole, setEditedRole] = useState(role);
    const [localChecked, setLocalChecked] = useState(isChecked);

    useEffect(() => {
        setLocalChecked(isChecked);
    }, [isChecked]);

    const handleCheckboxChange = () => {
        const updatedChecked = !localChecked;
        setLocalChecked(updatedChecked);
        onCheckboxChange(id, updatedChecked);
    };

    const handleDelete = () => {
        console.log(`Delete triggered for ID: ${id}`);
        dispatch(deleteData({ id }));
    };

    const handleEdit = () => {
        console.log('Edit Triggered');
        setIsEditing(true);
    };

    const handleSave = () => {
        console.log('Save Triggered');
        dispatch(editData({
            id: id,
            newData: {
                name: editedName,
                email: editedEmail,
                role: editedRole
            }
        }));

        setIsEditing(false);
    };

    return (
        <div className={`dataCard ${localChecked ? 'checked' : ''}`}>
            <input type='checkbox' checked={localChecked} onChange={handleCheckboxChange} />
            <input
                className='dataItem'
                value={editedName}
                disabled={!isEditing}
                onChange={(e) => setEditedName(e.target.value)}
            />
            <input
                className='dataItem'
                value={editedEmail}
                disabled={!isEditing}
                onChange={(e) => setEditedEmail(e.target.value)}
            />
            <input
                className='dataItem'
                value={editedRole}
                disabled={!isEditing}
                onChange={(e) => setEditedRole(e.target.value)}
            />
            <div className='dataItem'>
                {isEditing ? (
                    <button onClick={handleSave}>
                        Save
                    </button>
                ) : (
                    <button onClick={handleEdit}>
                        Edit
                    </button>
                )}
                <button onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DataCard;








