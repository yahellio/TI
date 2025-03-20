import React, { useContext } from 'react';
import '../css/Buttons.css';
import { TextContext } from './TextContext';
import {Encrypt, Decrypt} from "../Cypher.js"

const Buttons = () => {

    const{text, key, outRoad, setC} = useContext(TextContext);
    
    const mouseClickE = async () => {

        const encryptedText = Encrypt(text, key);
        console.log(encryptedText)
        setC(encryptedText); 
        if(outRoad) await window.electronAPI.writeInFile(outRoad, encryptedText);
    }
    const mouseClickD = async () => {
    
        const decryptedText = Decrypt(text, key);
        console.log(decryptedText)
        setC(decryptedText); 
        if(outRoad) await window.electronAPI.writeInFile(outRoad, decryptedText);
    
}

    return (
        <div className="buttons">
            <button className="encrypt" onClick = {mouseClickE}>Encrypt</button>
            <button className="decrypt" onClick = {mouseClickD}>Decrypt</button>
        </div>
    );
};

export default Buttons;