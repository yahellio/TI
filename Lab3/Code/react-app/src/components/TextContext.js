import React, { createContext, useState } from 'react';

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
    const [text, setText] = useState([""]);
    const [c, setC] = useState([""]);
    const [primeP, setPrimeP] = useState("8707");
    const [primeQ, setPrimeQ] = useState("5039");
    const [multN, setMultN] = useState("");
    const [numberB, setNumberB] = useState("4321012");
    const [outRoad, setOutRoad] = useState("ecrypted.txt");
    const [outDir, setOutDir] = useState("");
    const [actionType, setActionType] = useState('encrypt');

    return (
        <TextContext.Provider value={{ text, setText, primeP, setPrimeP, primeQ, setPrimeQ, multN, setMultN, numberB, setNumberB, outRoad, setOutRoad, c, setC, outDir, setOutDir, actionType, setActionType }}>
            {children}
        </TextContext.Provider>
    );
};