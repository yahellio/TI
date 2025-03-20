import React, { useContext } from 'react';
import '../css/MethodSelector.css';
import { TextContext } from './TextContext';

const MethodSelector = () => {
    const {method, setMethod} = useContext(TextContext);

    const handleMethodChange = (method) => {
        setMethod(method);
    };

    return (
        <div className="method-selector">
            <div
                className={`method-option ${method === 'pillar' ? 'active' : ''}`}
                onClick={() => handleMethodChange('pillar')}
            >
                Pillar<br />Method
            </div>
            <div
                className={`method-option ${method === 'vigenere' ? 'active' : ''}`}
                onClick={() => handleMethodChange('vigenere')}
            >
                Vigenere Method
            </div>
        </div>
    );
};

export default MethodSelector;