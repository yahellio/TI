import React, {useContext} from 'react';
import '../css/KeyInput.css';
import { TextContext } from './TextContext';

const KeyInput = () => {

    const {setKey} = useContext(TextContext);
    const handleChange = (event) => {
        //Добавить обработку ключа(удалять лишние символы)
        setKey(event.target.value);
    }

    return (
        <div className="key-input">
            <label className="key-label">Key</label>
            <input
                type="text"
                placeholder="Enter key"
                className="key-field"
                onChange={handleChange}
            />
        </div>
    );
};

export default KeyInput;