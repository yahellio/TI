import React, { useContext, useState } from 'react';
import '../css/Buttons.css';
import { TextContext } from './TextContext';
import {Ncrypt} from "../Cypher.js"

const CustomAlert = ({ message, onClose }) => {
    return (
      <div className="custom-alert-overlay">
        <div className="custom-alert">
          <p>{message}</p>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    );
  };

const Buttons = () => {

    const{text, setText, key, outRoad, outDir, setC, setgenKey} = useContext(TextContext);
    const [alertMessage, setAlertMessage] = useState(null);

    const showAlert = (message) => {
        setAlertMessage(message);
      };
      const closeAlert = () => {
        setAlertMessage(null);
      };
    const mouseClickE = async () => {
        if(key.length !== 28){
            showAlert("Key length is not 28!");
            return;
        }
        if(text.length % 8 !== 0 || text.length === 0){
            showAlert("The length of the original text is not a multiple of 8 bits. The text is padded with 0 at the end.");
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

        if(outDir && outRoad) await window.electronAPI.writeInFile(outDir + "/" + newFileName , ncryptedText[0]);
    }
    const mouseClickD = async () => {
    
        if(key.length !== 28 ){
            alert("Key length is not 28!")
            return;
        }
        if(text.length % 8 !== 0 || text.length === 0){
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

        if(outDir && outRoad) await window.electronAPI.writeInFile(outDir + "/" + newFileName, ncryptedText[0]);
    }   

    return (
        <div className="buttons">
            <button className="encrypt" onClick = {mouseClickE}>Encrypt</button>
            <button className="decrypt" onClick = {mouseClickD}>Decrypt</button>
            {alertMessage && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
};

export default Buttons;