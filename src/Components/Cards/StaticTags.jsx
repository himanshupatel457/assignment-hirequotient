import React, { useEffect, useState } from 'react';
import './StaticTags.css';

const StaticTags = ({ onRadioChange, isChecked: externalIsChecked }) => {
    const [isChecked, setChecked] = useState(false);

    const handleRadioChange = () => {
        setChecked(!isChecked);
        onRadioChange(!isChecked);
    };

    useEffect(() => {
        setChecked(externalIsChecked);
    }, [externalIsChecked]);

    return (
        <div className='staticTags'>
            <input type='checkbox' checked={isChecked} onChange={handleRadioChange} />
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Action</div>
        </div>
    );
};

export default StaticTags;
