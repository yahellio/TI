import React, { useContext } from 'react';
import '../css/MultN.css';
import { TextContext } from './TextContext';

const KeyInput = () => {
    const { multN } = useContext(TextContext);

    return (
        <div className="key-input">
            <label className="key-label">N</label>
            <input
                type="text"
                placeholder=""
                className="key-field"
                value={multN}
                readOnly 
            />
        </div>
    );
};

export default KeyInput;