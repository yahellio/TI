import React, { useContext, useState } from 'react';
import '../css/PrimeP.css';
import { TextContext } from './TextContext';

const KeyInput = () => {
    const { setPrimeP, primeP } = useContext(TextContext);
    const [inputValue, setInputValue] = useState(primeP); 

    const handleChange = (event) => {
        const filteredValue = event.target.value.replace(/[^0-9]/g, '');
        setInputValue(event.target.value); 
        setPrimeP(filteredValue); 
    };

    return (
        <div className="key-input">
            <label className="key-label">P</label>
            <input
                type="text"
                placeholder="Enter prime P"
                className="key-field"
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default KeyInput;