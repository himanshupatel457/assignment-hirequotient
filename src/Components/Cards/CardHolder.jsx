

import React, { useEffect, useState } from 'react';
import './CardHolder.css';
import StaticTags from './StaticTags';
import DataCard from './DataCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../Store/dataSlice';
import Pagination from '../Pagination/Pagination';

const CardHolder = ({ selectedCards, setSelectedCards  }) => {
    const dispatch = useDispatch();
    const { data, searchData, loading, error } = useSelector((state) => state.data);
    const [currentPage, setCurrentPage] = useState(1);
    const [isChecked, setChecked] = useState(false);
    const cardsPerPage = 10;
    const [selectedCardIds, setSelectedCardIds] = useState([]);

    const handleCheckboxChange = (id, isChecked) => {
        if (isChecked) {
            setSelectedCardIds((prevIds) => [...prevIds, id]);
        } else {
            setSelectedCardIds((prevIds) => prevIds.filter((cardId) => cardId !== id));
        }
    };

    const handleRadioChange = (value) => {

        if (value) {
            const allCardIds = slicedData.map((data) => data.id);
            setSelectedCardIds(allCardIds);
            setSelectedCards(allCardIds);
        } else {
            setSelectedCardIds([]);
            setSelectedCards([]);
        }

        setChecked(value);
    };


    


    useEffect(() => {
        setSelectedCards(selectedCardIds);
        setChecked(false);
        // handleRadioChange(false);
    }, [selectedCardIds, setSelectedCards]);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const currentData = searchData.length > 0 ? searchData : data;
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const slicedData = currentData.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSelectedCardIds([]);
        setChecked(false);
    };


    console.log(selectedCardIds);

    return (
        <div>
            {currentData.length > 0 && (
                <div className='cardHolder'>
                    <StaticTags onRadioChange={handleRadioChange} />
                    {slicedData.map((data, index) => (
                        <DataCard
                            key={data.id}
                            id={data.id}
                            name={data.name}
                            email={data.email}
                            role={data.role}
                            action={data.action}
                            isChecked={isChecked || selectedCardIds.includes(data.id)}
                            startIndex={startIndex}
                            endIndex={endIndex}
                            currentPage={currentPage}
                            cardsPerPage={cardsPerPage}
                            onCheckboxChange={handleCheckboxChange}
                            
                        />
                    ))}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(currentData.length / cardsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default CardHolder;
