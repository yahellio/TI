import React, { useContext, useState } from 'react';
import '../css/Buttons.css';
import { TextContext } from './TextContext';
import {Encrypt, Decrypt} from "../Cypher.js";
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

        setMultN(primeP*primeQ);

        if(!numberB || numberB >= multN  ){
          showAlert("P should be lower than N");
          return;
        }

      

        const encryptedText = Encrypt(text, numberB, multN);


        setC(encryptedText); 

        const lastDotIndex = outRoad.lastIndexOf('.');
        const fileName = outRoad.slice(0, lastDotIndex); 
        const fileExt = outRoad.slice(lastDotIndex); 
      
        const newFileName = `${fileName}_encrypt${fileExt}`;

        if(outDir && outRoad) await window.electronAPI.writeInFile(outDir + "/" + newFileName , encryptedText);
    }
    
    const mouseClickD = async () => {
  
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
     
      const decryptedText = Decrypt(text, numberB, multN, primeQ, primeP);

      setC(decryptedText); 

      const lastDotIndex = outRoad.lastIndexOf('.');
      const fileName = outRoad.slice(0, lastDotIndex); 
      const fileExt = outRoad.slice(lastDotIndex); 
    
      const newFileName = `${fileName}_decrypt${fileExt}`;

      if(outDir && outRoad) await window.electronAPI.writeInFile(outDir + "/" + newFileName, decryptedText);
      
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