import React, { useContext, useState } from 'react';
import '../css/KeyInput.css';
import { TextContext } from './TextContext';

const KeyInput = () => {
    const { key,setKey } = useContext(TextContext);
    const [inputValue, setInputValue] = useState(''); 

    const handleChange = (event) => {
        const filteredValue = event.target.value.replace(/[^01]/g, '');
        setInputValue(event.target.value); 
        setKey(filteredValue); 
    };

    return (
        <div className="key-input">
            <label className="key-label">Key</label>
            <div className="key-counter">
                <span>Length: {key.length}</span>
            </div>
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