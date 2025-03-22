import React, { useContext } from 'react';
import '../css/Buttons.css';
import { TextContext } from './TextContext';
import {Ncrypt} from "../Cypher.js"

const Buttons = () => {

    const{text, setText, key, outRoad, outDir, setC, setgenKey} = useContext(TextContext);
    
    const mouseClickE = async () => {
        if(key.length !== 28){
            alert("Key length is not 28!")
            return;
        }
        if(text.length % 8 !== 0){
            alert("The length of the original text is not a multiple of 8 bits. The text is padded with 0 at the end.");
            setText(text.padEnd(text.length + (8 - (text.length % 8)), '0'));
        }
        const ncryptedText = Ncrypt(text, key);
        console.log(ncryptedText[0])
        setC(ncryptedText[0]); 
        setgenKey(ncryptedText[1]);

        const lastDotIndex = outRoad.lastIndexOf('.');
        const fileName = outRoad.slice(0, lastDotIndex); 
        const fileExt = outRoad.slice(lastDotIndex); 
      
        const newFileName = `${fileName}_encrypt${fileExt}`;

        if(outDir) await window.electronAPI.writeInFile(outDir + "/" + newFileName , ncryptedText[0]);
    }
    const mouseClickD = async () => {
    
        if(key.length !== 28){
            alert("Key length is not 28!")
            return;
        }
        if(text.length % 8 !== 0){
            alert("The length of the original text is not a multiple of 8 bits. The text is padded with 0 at the end.");
            setText(text.padEnd(text.length + (8 - (text.length % 8)), '0'));
        }
        const ncryptedText = Ncrypt(text, key);
        console.log(ncryptedText[0])
        setC(ncryptedText[0]); 
        setgenKey(ncryptedText[1]);

        const lastDotIndex = outRoad.lastIndexOf('.');
        const fileName = outRoad.slice(0, lastDotIndex); 
        const fileExt = outRoad.slice(lastDotIndex); 
      
        const newFileName = `${fileName}_decrypt${fileExt}`;

        if(outDir) await window.electronAPI.writeInFile(outDir + "/" + newFileName, ncryptedText[0]);
    }   

    return (
        <div className="buttons">
            <button className="encrypt" onClick = {mouseClickE}>Encrypt</button>
            <button className="decrypt" onClick = {mouseClickD}>Decrypt</button>
        </div>
    );
};

export default Buttons;