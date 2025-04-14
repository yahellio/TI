import React,{ useContext} from 'react';
import { TextContext } from './TextContext';
import '../css/TextArea.css';

const TextArea = () => {
    const { text, setText } = useContext(TextContext);
    const handleChange = (event) => {
        setText(event.target.value);
    }
    return (
        <div className="text-area">
            <h1>Input Text</h1>
            <textarea  value={text} onChange={handleChange}/>
        </div>
    );
};

export default TextArea;