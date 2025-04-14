import React, { useContext, useState } from 'react';
import '../css/Buttons.css';
import { TextContext } from './TextContext';
import {Ncrypt} from "../Cypher.js";
import {isPrime} from "../isPrime.js"

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

    const{text, setText, primeP, primeQ, numberB, setMultN, multN, outRoad, outDir, setC, setgenKey} = useContext(TextContext);
    const [alertMessage, setAlertMessage] = useState(null);

    const showAlert = (message) => {
        setAlertMessage(message);
      };

    const closeAlert = () => {
      setAlertMessage(null);
    };

    const mouseClickE = async () => {
        let cleanedText = text.replace(/[^0-9]/g, ''); 

        if(!isPrime(primeP)){
            showAlert("P is not prime number!");
            return;
        }

        if(!isPrime(primeQ)){
          showAlert("Q is not prime number!");
          return;
        }

        if(primeP % 4 !== 3){
          showAlert("P mod 4 != 3");
          return;
        }

        if(primeQ % 4 !== 3){
          showAlert("Q mod 4 != 3");
          return;
        }

        if(!numberB || numberB >= multN  ){
          showAlert("P should be lower than N");
          return;
        }

        setMultN(primeP*primeQ);

        setText(cleanedText);

        /*const ncryptedText = Ncrypt(cleanedText, key);
        console.log(ncryptedText[0])
        setC(ncryptedText[0]); 
        setgenKey(ncryptedText[1]);

        const lastDotIndex = outRoad.lastIndexOf('.');
        const fileName = outRoad.slice(0, lastDotIndex); 
        const fileExt = outRoad.slice(lastDotIndex); 
      
        const newFileName = `${fileName}_encrypt${fileExt}`;

        if(outDir && outRoad) await window.electronAPI.writeInFile(outDir + "/" + newFileName , ncryptedText[0]);*/
    }
    const mouseClickD = async () => {
      setText(text.replace(/[^0-9]/g, ''));
  
      if(!isPrime(primeP)){
        showAlert("P is not prime number!");
        return;
      }

      if(!isPrime(primeQ)){
        showAlert("Q is not prime number!");
        return;
      }

      if(primeP % 4 !== 3){
        showAlert("P mod 4 != 3");
        return;
      }

      if(primeQ % 4 !== 3){
        showAlert("Q mod 4 != 3");
        return;
      }

      if(!numberB || numberB >= multN  ){
        showAlert("P should be lower than N");
        return;
      }

      setMultN(primeP*primeQ);
      /*
        const ncryptedText = Ncrypt(text, key);
        console.log(ncryptedText[0])
        setC(ncryptedText[0]); 
        setgenKey(ncryptedText[1]);

        const lastDotIndex = outRoad.lastIndexOf('.');
        const fileName = outRoad.slice(0, lastDotIndex); 
        const fileExt = outRoad.slice(lastDotIndex); 
      
        const newFileName = `${fileName}_decrypt${fileExt}`;

        if(outDir && outRoad) await window.electronAPI.writeInFile(outDir + "/" + newFileName, ncryptedText[0]);
      */
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