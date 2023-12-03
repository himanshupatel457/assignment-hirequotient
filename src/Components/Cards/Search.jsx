// ExampleComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './dataSlice';
import { setSearchData } from './searchSlice';

const Search = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.data);
    const { searchData } = useSelector((state) => state.search);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const handleSearch = (keyword) => {
        dispatch(setSearchData({ keyword }));
    };

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <ul>
                {searchData.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <button onClick={() => handleSearch}>Search</button>
        </div>
    );
};

export default Search;
