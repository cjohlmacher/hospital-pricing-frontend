import React from 'react';
import './SortBar.css';

const SortBar = ({choices, sortedName, selectHandler}) => {
    const options = choices.map(choice => {
        return <option key={choice} value={choice}>{choice}</option>
    });

    const handleSelect = (e) => {
        e.preventDefault();
        selectHandler(e.target.value);
    };

    return (
        <div className="SortBar">
            <p>Sort {sortedName} by:</p>
            <select onChange={handleSelect}>
                {options}
            </select>
        </div>
    )
};

export default SortBar;