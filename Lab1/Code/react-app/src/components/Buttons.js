import React, { useContext } from 'react';
import '../css/Buttons.css';
import { TextContext } from './TextContext';
import {Encrypt, Decrypt} from "../Pillar.js"
import {EncryptV, DecryptV} from "../Vigenere.js"


const Buttons = () => {

    const{text, key, outRoad, method, setC} = useContext(TextContext);
    
    const mouseClickE = async () => {
        if(method === "pillar"){
            const encryptedText = Encrypt(text, key);
            setC(encryptedText); 
            if(outRoad) await window.electronAPI.writeInFile(outRoad, encryptedText);
        }else{
            const encryptedText = EncryptV(text, key);
            console.log(encryptedText)
            setC(encryptedText); 
            if(outRoad) await window.electronAPI.writeInFile(outRoad, encryptedText);
        }
    }
    const mouseClickD = async () => {
        if(method === "pillar"){
            const decryptedText = Decrypt(text, key);
            setC(decryptedText); 
            if(outRoad) await window.electronAPI.writeInFile(outRoad, decryptedText);
        }else{
            const decryptedText = DecryptV(text, key);
            console.log(decryptedText)
            setC(decryptedText); 
            if(outRoad) await window.electronAPI.writeInFile(outRoad, decryptedText);
        }
    }

    return (
        <div className="buttons">
            <button className="encrypt" onClick = {mouseClickE}>Encrypt</button>
            <button className="decrypt" onClick = {mouseClickD}>Decrypt</button>
        </div>
    );
};

export default Buttons;