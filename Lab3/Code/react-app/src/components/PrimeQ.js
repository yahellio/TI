import React, { useContext, useState } from 'react';
import '../css/PrimeQ.css';
import { TextContext } from './TextContext';

const KeyInput = () => {
    const { setPrimeQ, primeQ } = useContext(TextContext);
    const [inputValue, setInputValue] = useState(primeQ); 

    const handleChange = (event) => {
        const filteredValue = event.target.value.replace(/[^0-9]/g, '');
        setInputValue(event.target.value); 
        setPrimeQ(filteredValue); 
    };

    return (
        <div className="key-input">
            <label className="key-label">Q</label>
            <input
                type="text"
                placeholder="Enter prime Q"
                className="key-field"
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default KeyInput;