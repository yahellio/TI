import React, { useContext, useState } from 'react';
import '../css/KeyInput.css';
import { TextContext } from './TextContext';
const max = 28;

const KeyInput = () => {
    const { setKey } = useContext(TextContext);
    const [inputValue, setInputValue] = useState(''); 

    const handleChange = (event) => {
        const filteredValue = event.target.value.replace(/[^01]/g, '');
        setInputValue(filteredValue); 
        setKey(filteredValue); 
    };

    return (
        <div className="key-input">
            <label className="key-label">Key</label>
            <input
                type="text"
                placeholder="Enter key"
                className="key-field"
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default KeyInput;