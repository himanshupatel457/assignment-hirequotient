// Layout.js

import React, { useState } from 'react';
import './Layout.css';
import { useDispatch } from 'react-redux';
import { deletePageData, fetchSearchData } from '../Store/dataSlice';
import CardHolder from './Cards/CardHolder';

const Layout = () => {
    
    const dispatch  = useDispatch();
    const [selectedCards,setSelectedCards] = useState([]);
    const handleSearch = (e) => {
        console.log(e.target.value);
        dispatch(fetchSearchData({ keyword: e.target.value }));
    };

    const handleDelete = () => {
        console.log(selectedCards);
        dispatch(deletePageData({ idsToDelete: selectedCards }));
        setSelectedCards([]);
    };

    return (
        <div className='main-div'>
            <div className='header-elements'>
                <header className='header'>
                    <h1>Admin Dashboard</h1>
                </header>
                <div className='search-bar'>
                    <input type='text' onChange={handleSearch} placeholder='Search...' />
                </div>

                <button className='delete-button' onClick={handleDelete}>
                    Delete
                </button>
            </div>
            <div className='body'>
            <CardHolder
                    selectedCardIds={selectedCards}
                    setSelectedCards={setSelectedCards}
                />
            </div>
            <div className='footer-elements'>
                <footer className='header'>
                    <h1>Admin Footer</h1>
                </footer>
                
            </div>
            
        </div>
    );
};

export default Layout;
