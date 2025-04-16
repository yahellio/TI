import React,{ useContext} from 'react';
import { TextContext } from './TextContext';
import '../css/TextArea.css';

const TextArea = () => {
    const { text} = useContext(TextContext);

    return (
        <div className="text-area">
            <h1>Input Text</h1>
            <textarea  value={text.join("")} readOnly/>
        </div>
    );
};

export default TextArea;