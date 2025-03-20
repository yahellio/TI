import React, {useContext} from 'react';
import '../css/KeyInput.css';
import { TextContext } from './TextContext';

const KeyInput = () => {
    //должен показывать выброшенные биты

    const {setKey} = useContext(TextContext);
    const handleChange = (event) => {
        
        setKey(event.target.value);
    }

    return (
        <div className="key-input">
            <label className="key-label">Generated Key</label>
            <input
                type="text"
                placeholder=""
                className="key-field"
                onChange={handleChange}
            />
        </div>
    );
};

export default KeyInput;