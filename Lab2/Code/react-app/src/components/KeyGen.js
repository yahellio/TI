import React, { useContext} from 'react';
import '../css/KeyInput.css';
import { TextContext } from './TextContext';

const KeyInput = () => {
    const { genKey } = useContext(TextContext);

    return (
        <div className="key-input">
            <label className="key-label">Generated Key</label>
            <input
                type="text"
                placeholder=""
                className="key-field"
                value={genKey}
            />
        </div>
    );
};

export default KeyInput;