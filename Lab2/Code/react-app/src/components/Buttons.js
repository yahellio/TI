import React, { useContext } from 'react';
import '../css/Buttons.css';
import { TextContext } from './TextContext';
import {Ncrypt} from "../Cypher.js"

const Buttons = () => {

    const{text, key, outRoad, setC, setgenKey} = useContext(TextContext);
    
    const mouseClickE = async () => {
        if(key.length != 28){
            alert("Key length is not 28!")
            return;
        }
        const ncryptedText = Ncrypt(text, key);
        console.log(ncryptedText[0])
        setC(ncryptedText[0]); 
        setgenKey(ncryptedText[1]);
        if(outRoad) await window.electronAPI.writeInFile(outRoad, ncryptedText[0]);
    }
    const mouseClickD = async () => {
    
        if(key.length != 28){
            alert("Key length is not 28!")
            return;
        }
        const ncryptedText = Ncrypt(text, key);
        console.log(ncryptedText[0])
        setC(ncryptedText[0]); 
        setgenKey(ncryptedText[1]);
        if(outRoad) await window.electronAPI.writeInFile(outRoad, ncryptedText[0]);
    }   

    return (
        <div className="buttons">
            <button className="encrypt" onClick = {mouseClickE}>Encrypt</button>
            <button className="decrypt" onClick = {mouseClickD}>Decrypt</button>
        </div>
    );
};

export default Buttons;