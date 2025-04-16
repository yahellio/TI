import React,{ useContext } from 'react';
import { TextContext } from './TextContext';
import '../css/OutputArea.css';

const TextArea = () => {
    const { c,setC } = useContext(TextContext);    
    const handleChange = (event) => {
        setC(event.target.value);
    }
    return (
        <div className="text-area">
            <h1>Output Text</h1>
            <textarea  readOnly value={c.join("")} onChange={handleChange}/>
        </div>
    );
};

export default TextArea;