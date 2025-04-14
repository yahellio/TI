import React, { useContext, useState } from 'react';
import '../css/NumberB.css';
import { TextContext } from './TextContext';

const KeyInput = () => {
    const { setNumberB } = useContext(TextContext);
    const [inputValue, setInputValue] = useState(''); 

    const handleChange = (event) => {
        const filteredValue = event.target.value.replace(/[^0-9]/g, '');
        setInputValue(event.target.value); 
        setNumberB(filteredValue); 
    };

    return (
        <div className="key-input">
            <label className="key-label">B</label>
            <input
                type="text"
                placeholder="Enter number B"
                className="key-field"
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default KeyInput;