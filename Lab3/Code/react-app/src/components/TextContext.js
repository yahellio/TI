import React, { createContext, useState } from 'react';

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
    const [text, setText] = useState([""]);
    const [c, setC] = useState([""]);
    const [primeP, setPrimeP] = useState("");
    const [primeQ, setPrimeQ] = useState("");
    const [multN, setMultN] = useState("");
    const [numberB, setNumberB] = useState("");
    const [outRoad, setOutRoad] = useState("ecrypted.txt");
    const [outDir, setOutDir] = useState("");
    

    return (
        <TextContext.Provider value={{ text, setText, primeP, setPrimeP, primeQ, setPrimeQ, multN, setMultN, numberB, setNumberB, outRoad, setOutRoad, c, setC, outDir, setOutDir }}>
            {children}
        </TextContext.Provider>
    );
};