import React, { useContext, useState } from 'react';
import '../css/Buttons.css';
import { TextContext } from './TextContext';
import { Encrypt, Decrypt } from "../Cypher.js";
import { isPrime } from "../isPrime.js"

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
    const { text, primeP, primeQ, numberB, setMultN, multN, outRoad, outDir, setC, actionType, setActionType} = useContext(TextContext);

    const [alertMessage, setAlertMessage] = useState(null);
    const showAlert = (message) => {
        setAlertMessage(message);
    };

    const closeAlert = () => {
        setAlertMessage(null);
    };

    const handleAction = async () => {
        if (actionType === 'encrypt') {
            await handleEncrypt();
        } else {
            await handleDecrypt();
        }
    };

    const handleEncrypt = async () => {
        if (!isPrime(primeP)) {
            showAlert("P is not prime number!");
            return;
        }

        if (!isPrime(primeQ)) {
            showAlert("Q is not prime number!");
            return;
        }

        if (primeP % 4 !== 3) {
            showAlert("P mod 4 != 3");
            return;
        }

        if (primeQ % 4 !== 3) {
            showAlert("Q mod 4 != 3");
            return;
        }

        setMultN(primeP * primeQ);

        if (!numberB || numberB >= multN) {
            showAlert("P should be lower than N");
            return;
        }

        const encryptedText = Encrypt(text, numberB, multN);
        setC(encryptedText);

        const lastDotIndex = outRoad.lastIndexOf('.');
        const fileName = outRoad.slice(0, lastDotIndex);
        const fileExt = outRoad.slice(lastDotIndex);

        const newFileName = `${fileName}_encrypt${fileExt}`;

        if (outDir && outRoad) await window.electronAPI.writeInFile(outDir + "/" + newFileName, encryptedText, 4);
    }

    const handleDecrypt = async () => {
        if (!isPrime(primeP)) {
            showAlert("P is not prime number!");
            return;
        }

        if (!isPrime(primeQ)) {
            showAlert("Q is not prime number!");
            return;
        }

        if (primeP % 4 !== 3) {
            showAlert("P mod 4 != 3");
            return;
        }

        if (primeQ % 4 !== 3) {
            showAlert("Q mod 4 != 3");
            return;
        }

        setMultN(primeP * primeQ);
        
        if (!numberB || numberB >= multN) {
          showAlert("P should be lower than N");
          return;
      }
        const decryptedText = Decrypt(text, numberB, multN, primeQ, primeP);
        setC(decryptedText);

        const lastDotIndex = outRoad.lastIndexOf('.');
        const fileName = outRoad.slice(0, lastDotIndex);
        const fileExt = outRoad.slice(lastDotIndex);

        const newFileName = `${fileName}_decrypt${fileExt}`;

        if (outDir && outRoad) await window.electronAPI.writeInFile(outDir + "/" + newFileName, decryptedText, 1);
    }

    return (
        <div className="buttons-container">
            <div className="action-selector">
                <label className={`radio-label ${actionType === 'encrypt' ? 'active' : ''}`}>
                    <input
                        type="radio"
                        name="actionType"
                        value="encrypt"
                        checked={actionType === 'encrypt'}
                        onChange={() => setActionType('encrypt')}
                    />
                    Encrypt
                </label>
                <label className={`radio-label ${actionType === 'decrypt' ? 'active' : ''}`}>
                    <input
                        type="radio"
                        name="actionType"
                        value="decrypt"
                        checked={actionType === 'decrypt'}
                        onChange={() => setActionType('decrypt')}
                    />
                    Decrypt
                </label>
            </div>
            <button className="execute-button" onClick={handleAction}>
                Execute
            </button>
            {alertMessage && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
};

export default Buttons;